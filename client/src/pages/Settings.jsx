import { useToast } from '../context/ToastContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { changePassword, deleteAccount } from '../services/api'
import DashboardLayout from '../layouts/DashboardLayout'
import Modal from '../components/Modal'
import './Settings.css'

function Settings() {
  const { showToast } = useToast()
  const { token, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [passwordErrors, setPasswordErrors] = useState({})
  const [passwordMessage, setPasswordMessage] = useState('')
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordMessage('')

    const errors = {}
    if (!passwordData.currentPassword) errors.currentPassword = 'Required'
    if (!passwordData.newPassword) {
      errors.newPassword = 'Required'
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'Must be at least 6 characters'
    }
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      errors.confirmNewPassword = 'Passwords do not match'
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors)
      return
    }

    setPasswordErrors({})
    setIsChangingPassword(true)

    try {
      await changePassword(
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        token
      )
      setPasswordMessage('Password updated successfully')
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' })
    } catch (err) {
      setPasswordErrors({ currentPassword: err.message })
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleDeleteAccount = async () => {
  setIsDeleting(true)
  try {
    await deleteAccount(token)
    logout()
    navigate('/')
  } catch (err) {
    showToast(err.message, 'error')
    setIsDeleting(false)
  }
}

  return (
    <DashboardLayout title="Settings">
      {/* Appearance */}
      <div className="settings-section">
        <h3>Appearance</h3>
        <p className="settings-desc">Choose how JobTrack looks on your device.</p>
        <div className="appearance-preview">
          <button
            className={`appearance-option ${theme === 'light' ? 'active' : ''}`}
            onClick={() => theme !== 'light' && toggleTheme()}
          >
            ☀️ Light
          </button>
          <button
            className={`appearance-option ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => theme !== 'dark' && toggleTheme()}
          >
            🌙 Dark
          </button>
        </div>
      </div>

      {/* Change password */}
      <div className="settings-section">
        <h3>Change Password</h3>

        {passwordMessage && <div className="profile-success">{passwordMessage}</div>}

        <form className="app-form" onSubmit={handlePasswordSubmit}>
          <div className="app-form-grid">
            <div className="form-group span-2">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className={passwordErrors.currentPassword ? 'input-error' : ''}
              />
              {passwordErrors.currentPassword && (
                <span className="error-text">{passwordErrors.currentPassword}</span>
              )}
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className={passwordErrors.newPassword ? 'input-error' : ''}
              />
              {passwordErrors.newPassword && <span className="error-text">{passwordErrors.newPassword}</span>}
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                className={passwordErrors.confirmNewPassword ? 'input-error' : ''}
              />
              {passwordErrors.confirmNewPassword && (
                <span className="error-text">{passwordErrors.confirmNewPassword}</span>
              )}
            </div>
          </div>

          <div className="app-form-actions">
            <button type="submit" className="btn btn-primary" disabled={isChangingPassword}>
              {isChangingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* Delete account */}
      <div className="settings-section settings-danger">
        <h3>Delete Account</h3>
        <p className="settings-desc">
          Permanently delete your account and all associated applications and interviews. This cannot be undone.
        </p>
        <button
          className="btn"
          style={{ backgroundColor: 'var(--danger-color)', color: '#fff' }}
          onClick={() => setDeleteModalOpen(true)}
        >
          Delete My Account
        </button>
      </div>

      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Account">
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          This will permanently delete your account and all your data. Type <strong>DELETE</strong> below to confirm.
        </p>
        <input
          className="settings-confirm-input"
          value={deleteConfirmText}
          onChange={(e) => setDeleteConfirmText(e.target.value)}
          placeholder="Type DELETE to confirm"
        />
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button className="btn btn-outline" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </button>
          <button
            className="btn"
            style={{ backgroundColor: 'var(--danger-color)', color: '#fff' }}
            disabled={deleteConfirmText !== 'DELETE' || isDeleting}
            onClick={handleDeleteAccount}
          >
            {isDeleting ? 'Deleting...' : 'Permanently Delete'}
          </button>
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default Settings