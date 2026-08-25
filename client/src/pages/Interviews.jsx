import { useToast } from '../context/ToastContext'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  getInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
} from '../services/api'
import DashboardLayout from '../layouts/DashboardLayout'
import Modal from '../components/Modal'
import InterviewForm from '../components/InterviewForm'
import ConfirmDialog from '../components/ConfirmDialog'
import './Interviews.css'

const typeIcons = {
  Phone: '📞',
  Video: '🎥',
  Technical: '💻',
  HR: '🤝',
  'On-site': '🏢',
}

function Interviews() {
  const { showToast } = useToast()
  const { token } = useAuth()
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [editingInterview, setEditingInterview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const fetchInterviews = async () => {
    try {
      setLoading(true)
      const data = await getInterviews(token)
      setInterviews(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchInterviews()
  }, [token])

  const openAddModal = () => {
    setEditingInterview(null)
    setModalOpen(true)
  }

  const openEditModal = (interview) => {
    setEditingInterview(interview)
    setModalOpen(true)
  }

  const handleFormSubmit = async (formData) => {
  setIsSubmitting(true)
  try {
    if (editingInterview) {
      await updateInterview(editingInterview._id, formData, token)
      showToast('Interview updated successfully')
    } else {
      await createInterview(formData, token)
      showToast('Interview added successfully')
    }
    setModalOpen(false)
    fetchInterviews()
  } catch (err) {
    showToast(err.message, 'error')
  } finally {
    setIsSubmitting(false)
  }
}

  const handleDeleteConfirm = async () => {
  try {
    await deleteInterview(deleteTarget._id, token)
    setDeleteTarget(null)
    fetchInterviews()
    showToast('Interview deleted')
  } catch (err) {
    showToast(err.message, 'error')
  }
}

  // Split into upcoming (today or later) and past — upcoming shown first, per spec
  const now = new Date()
  now.setHours(0, 0, 0, 0)

  const upcoming = interviews.filter((i) => new Date(i.interviewDate) >= now)
  const past = interviews.filter((i) => new Date(i.interviewDate) < now)

  const renderCard = (interview) => (
    <div className="interview-card" key={interview._id}>
      <div className="interview-card-icon">{typeIcons[interview.interviewType] || '🗓️'}</div>
      <div className="interview-card-body">
        <p className="interview-card-title">{interview.jobTitle}</p>
        <p className="interview-card-company">{interview.company}</p>
        <p className="interview-card-meta">
          {new Date(interview.interviewDate).toLocaleDateString()}
          {interview.interviewTime && ` · ${interview.interviewTime}`} · {interview.interviewType}
        </p>
        {interview.interviewer && (
          <p className="interview-card-meta">Interviewer: {interview.interviewer}</p>
        )}
        {interview.meetingLink && (
          <a href={interview.meetingLink} target="_blank" rel="noreferrer" className="interview-card-link">
            Join meeting →
          </a>
        )}
      </div>
      <div className="interview-card-actions">
        <button onClick={() => openEditModal(interview)}>Edit</button>
        <button onClick={() => setDeleteTarget(interview)} className="danger">Delete</button>
      </div>
    </div>
  )

  return (
    <DashboardLayout title="Interviews">
      <div className="interviews-toolbar">
        <button className="btn btn-primary" onClick={openAddModal}>
          + Add Interview
        </button>
      </div>

      {loading && <p>Loading interviews...</p>}
      {error && <p style={{ color: 'var(--danger-color)' }}>{error}</p>}

      {!loading && !error && interviews.length === 0 && (
        <div className="apps-empty">
          <p>No interviews scheduled yet.</p>
        </div>
      )}

      {!loading && !error && interviews.length > 0 && (
        <>
          {upcoming.length > 0 && (
            <>
              <h3 className="interviews-section-title">Upcoming</h3>
              <div className="interviews-list">{upcoming.map(renderCard)}</div>
            </>
          )}

          {past.length > 0 && (
            <>
              <h3 className="interviews-section-title">Past</h3>
              <div className="interviews-list">{past.map(renderCard)}</div>
            </>
          )}
        </>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingInterview ? 'Edit Interview' : 'Add Interview'}
      >
        <InterviewForm
          initialData={editingInterview}
          onSubmit={handleFormSubmit}
          onCancel={() => setModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Interview"
        message={`Are you sure you want to delete the interview for ${deleteTarget?.jobTitle} at ${deleteTarget?.company}?`}
      />
    </DashboardLayout>
  )
}

export default Interviews