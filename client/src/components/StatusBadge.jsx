import './StatusBadge.css'

const statusStyles = {
  Applied: 'badge-applied',
  'Under Review': 'badge-review',
  Interview: 'badge-interview',
  Offer: 'badge-offer',
  Rejected: 'badge-rejected',
  Withdrawn: 'badge-withdrawn',
}

function StatusBadge({ status }) {
  return <span className={`status-badge ${statusStyles[status] || ''}`}>{status}</span>
}

export default StatusBadge