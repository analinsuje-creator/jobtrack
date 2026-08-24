import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import { getApplications } from '../services/api'
import DashboardLayout from '../layouts/DashboardLayout'
import './Analytics.css'

const STATUS_LIST = ['Applied', 'Under Review', 'Interview', 'Offer', 'Rejected', 'Withdrawn']

const STATUS_COLORS = {
  Applied: '#4f46e5',
  'Under Review': '#d97706',
  Interview: '#1d4ed8',
  Offer: '#16a34a',
  Rejected: '#dc2626',
  Withdrawn: '#6b7280',
}

function Analytics() {
  const { token } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApplications(token)
        setApplications(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    if (token) fetchData()
  }, [token])

  // ===== Applications by status =====
  const statusCounts = useMemo(() => {
    const counts = {}
    STATUS_LIST.forEach((s) => (counts[s] = 0))
    applications.forEach((app) => {
      if (counts[app.status] !== undefined) counts[app.status]++
    })
    return counts
  }, [applications])

  const maxStatusCount = Math.max(1, ...Object.values(statusCounts))

  // ===== Monthly applications (last 6 months, including empty ones) =====
  const monthlyData = useMemo(() => {
    const months = []
    const now = new Date()

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      months.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: d.toLocaleDateString('en-US', { month: 'short' }),
        count: 0,
      })
    }

    applications.forEach((app) => {
      if (!app.applicationDate) return
      const d = new Date(app.applicationDate)
      const key = `${d.getFullYear()}-${d.getMonth()}`
      const match = months.find((m) => m.key === key)
      if (match) match.count++
    })

    return months
  }, [applications])

  const maxMonthlyCount = Math.max(1, ...monthlyData.map((m) => m.count))

  // ===== Rates =====
  const total = applications.length
  const interviewCount = applications.filter((a) => a.status === 'Interview').length
  const offerCount = applications.filter((a) => a.status === 'Offer').length

  const interviewRate = total > 0 ? ((interviewCount / total) * 100).toFixed(1) : '0.0'
  const offerRate = total > 0 ? ((offerCount / total) * 100).toFixed(1) : '0.0'

  return (
    <DashboardLayout title="Analytics">
      {loading && <p>Loading analytics...</p>}
      {error && <p style={{ color: 'var(--danger-color)' }}>{error}</p>}

      {!loading && !error && total === 0 && (
        <div className="apps-empty">
          <p>Add some applications to see your analytics here.</p>
        </div>
      )}

      {!loading && !error && total > 0 && (
        <>
          {/* Rate cards */}
          <div className="rate-cards">
            <div className="rate-card">
              <p className="rate-value">{interviewRate}%</p>
              <p className="rate-label">Interview Rate</p>
              <p className="rate-sub">{interviewCount} of {total} applications</p>
            </div>
            <div className="rate-card">
              <p className="rate-value">{offerRate}%</p>
              <p className="rate-label">Offer Rate</p>
              <p className="rate-sub">{offerCount} of {total} applications</p>
            </div>
          </div>

          {/* Applications by status */}
          <div className="analytics-panel">
            <h3>Applications by Status</h3>
            <div className="bar-chart">
              {STATUS_LIST.map((status) => (
                <div className="bar-row" key={status}>
                  <span className="bar-label">{status}</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${(statusCounts[status] / maxStatusCount) * 100}%`,
                        backgroundColor: STATUS_COLORS[status],
                      }}
                    />
                  </div>
                  <span className="bar-count">{statusCounts[status]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly applications */}
          <div className="analytics-panel">
            <h3>Monthly Applications</h3>
            <div className="month-chart">
              {monthlyData.map((m) => (
                <div className="month-col" key={m.key}>
                  <div className="month-bar-track">
                    <div
                      className="month-bar-fill"
                      style={{ height: `${(m.count / maxMonthlyCount) * 100}%` }}
                    />
                  </div>
                  <span className="month-count">{m.count}</span>
                  <span className="month-label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  )
}

export default Analytics