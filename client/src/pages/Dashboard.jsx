import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getApplications } from '../services/api'
import DashboardLayout from '../layouts/DashboardLayout'
import StatCard from '../components/StatCard'

function Dashboard() {
  const { user, token } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications(token)
        setApplications(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchApplications()
  }, [token])

  // Derive stats directly from real data — never hard-coded
  const total = applications.length
  const interviews = applications.filter((a) => a.status === 'Interview').length
  const offers = applications.filter((a) => a.status === 'Offer').length
  const rejected = applications.filter((a) => a.status === 'Rejected').length

  return (
    <DashboardLayout title="Dashboard">
      <h2 style={{ marginBottom: '8px' }}>Welcome back, {user?.name?.split(' ')[0]}!</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>
        Here's an overview of your job search.
      </p>

      {loading && <p>Loading your stats...</p>}
      {error && <p style={{ color: 'var(--danger-color)' }}>{error}</p>}

      {!loading && !error && (
        <>
          <div className="stats-grid">
            <StatCard label="Total Applications" value={total} icon="📋" accent="primary" />
            <StatCard label="Interviews" value={interviews} icon="🗓️" accent="warning" />
            <StatCard label="Offers" value={offers} icon="🎉" accent="success" />
            <StatCard label="Rejected" value={rejected} icon="❌" accent="danger" />
          </div>

          {applications.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--text-secondary)',
              }}
            >
              <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No applications yet</p>
              <p style={{ fontSize: '0.9rem' }}>
                Start tracking your job search by adding your first application.
              </p>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  )
}

export default Dashboard