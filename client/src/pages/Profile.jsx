import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getProfile, updateProfile } from '../services/api'
import DashboardLayout from '../layouts/DashboardLayout'
import './Profile.css'

function Profile() {
  const { token } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    title: '',
  })
  const [createdAt, setCreatedAt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(token)
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          title: data.title || '',
        })
        setCreatedAt(data.createdAt)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    if (token) fetchProfile()
  }, [token])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setIsSaving(true)

    try {
      await updateProfile(formData, token)
      setMessage('Profile updated successfully')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Profile">
        <p>Loading profile...</p>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Profile">
      <div className="profile-card">
        {createdAt && (
          <p className="profile-since">
            Member since {new Date(createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        )}

        {message && <div className="profile-success">{message}</div>}
        {error && <div className="profile-error">{error}</div>}

        <form className="app-form" onSubmit={handleSubmit}>
          <div className="app-form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input name="location" value={formData.location} onChange={handleChange} placeholder="Chennai, India" />
            </div>

            <div className="form-group span-2">
              <label>Professional Title</label>
              <input name="title" value={formData.title} onChange={handleChange} placeholder="Full-Stack Developer" />
            </div>
          </div>

          <div className="app-form-actions">
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default Profile