import { useToast } from '../context/ToastContext'
import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from '../services/api'
import DashboardLayout from '../layouts/DashboardLayout'
import Modal from '../components/Modal'
import ApplicationForm from '../components/ApplicationForm'
import ConfirmDialog from '../components/ConfirmDialog'
import StatusBadge from '../components/StatusBadge'
import './Applications.css'

function Applications() {
  const { token } = useAuth()
  const { showToast } = useToast()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [jobTypeFilter, setJobTypeFilter] = useState('All')
  const [workModeFilter, setWorkModeFilter] = useState('All')

  const [modalOpen, setModalOpen] = useState(false)
  const [editingApp, setEditingApp] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState(null)

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const data = await getApplications(token)
      setApplications(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchApplications()
  }, [token])

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        !search ||
        app.companyName.toLowerCase().includes(search.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
        app.location.toLowerCase().includes(search.toLowerCase())

      const matchesStatus = statusFilter === 'All' || app.status === statusFilter
      const matchesJobType = jobTypeFilter === 'All' || app.jobType === jobTypeFilter
      const matchesWorkMode = workModeFilter === 'All' || app.workMode === workModeFilter

      return matchesSearch && matchesStatus && matchesJobType && matchesWorkMode
    })
  }, [applications, search, statusFilter, jobTypeFilter, workModeFilter])

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('All')
    setJobTypeFilter('All')
    setWorkModeFilter('All')
  }

  const openAddModal = () => {
    setEditingApp(null)
    setModalOpen(true)
  }

  const openEditModal = (app) => {
    setEditingApp(app)
    setModalOpen(true)
  }

  const handleFormSubmit = async (formData) => {
  setIsSubmitting(true)
  try {
    if (editingApp) {
      await updateApplication(editingApp._id, formData, token)
      showToast('Application updated successfully')
    } else {
      await createApplication(formData, token)
      showToast('Application added successfully')
    }
    setModalOpen(false)
    fetchApplications()
  } catch (err) {
    showToast(err.message, 'error')
  } finally {
    setIsSubmitting(false)
  }
}

 const handleDeleteConfirm = async () => {
  try {
    await deleteApplication(deleteTarget._id, token)
    setDeleteTarget(null)
    fetchApplications()
    showToast('Application deleted')
  } catch (err) {
    showToast(err.message, 'error')
  }
}

  return (
    <DashboardLayout title="Applications">
      <div className="apps-toolbar">
        <input
          type="text"
          placeholder="Search by company, title, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="apps-search"
        />
        <button className="btn btn-primary" onClick={openAddModal}>
          + Add Application
        </button>
      </div>

      <div className="apps-filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option>Applied</option>
          <option>Under Review</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
          <option>Withdrawn</option>
        </select>

        <select value={jobTypeFilter} onChange={(e) => setJobTypeFilter(e.target.value)}>
          <option value="All">All Job Types</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Contract</option>
          <option>Freelance</option>
        </select>

        <select value={workModeFilter} onChange={(e) => setWorkModeFilter(e.target.value)}>
          <option value="All">All Work Modes</option>
          <option>Remote</option>
          <option>Hybrid</option>
          <option>On-site</option>
        </select>

        <button className="btn btn-text" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {loading && <p>Loading applications...</p>}
      {error && <p style={{ color: 'var(--danger-color)' }}>{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <div className="apps-empty">
          <p>No applications match your search/filters.</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          {/* Desktop table */}
          <div className="apps-table-wrapper">
            <table className="apps-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Job Type</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th>Follow-up</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => (
                  <tr key={app._id}>
                    <td>{app.companyName}</td>
                    <td>{app.jobTitle}</td>
                    <td>{app.location || '—'}</td>
                    <td>{app.jobType}</td>
                    <td>{app.applicationDate ? new Date(app.applicationDate).toLocaleDateString() : '—'}</td>
                    <td><StatusBadge status={app.status} /></td>
                    <td>{app.followUpDate ? new Date(app.followUpDate).toLocaleDateString() : '—'}</td>
                    <td className="apps-actions">
                      <button onClick={() => openEditModal(app)}>Edit</button>
                      <button onClick={() => setDeleteTarget(app)} className="danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="apps-cards">
            {filtered.map((app) => (
              <div className="apps-card" key={app._id}>
                <div className="apps-card-header">
                  <div>
                    <p className="apps-card-title">{app.jobTitle}</p>
                    <p className="apps-card-company">{app.companyName}</p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
                <p className="apps-card-meta">
                  {app.location || 'No location'} · {app.jobType}
                </p>
                <div className="apps-card-actions">
                  <button onClick={() => openEditModal(app)}>Edit</button>
                  <button onClick={() => setDeleteTarget(app)} className="danger">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingApp ? 'Edit Application' : 'Add Application'}
      >
        <ApplicationForm
          initialData={editingApp}
          onSubmit={handleFormSubmit}
          onCancel={() => setModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Application"
        message={`Are you sure you want to delete the application for ${deleteTarget?.jobTitle} at ${deleteTarget?.companyName}? This cannot be undone.`}
      />
    </DashboardLayout>
  )
}

export default Applications