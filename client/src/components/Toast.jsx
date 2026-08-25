import './Toast.css'

function Toast({ message, type, onClose }) {
  const icons = {
    success: '✓',
    error: '✕',
  }

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">{icons[type] || icons.success}</span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Dismiss">
        ✕
      </button>
    </div>
  )
}

export default Toast