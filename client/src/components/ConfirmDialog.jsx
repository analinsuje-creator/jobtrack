import Modal from './Modal'

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>{message}</p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button className="btn btn-outline" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn"
          style={{ backgroundColor: 'var(--danger-color)', color: '#fff' }}
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog