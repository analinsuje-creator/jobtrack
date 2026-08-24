import { useState, useEffect } from 'react'
import '../components/ApplicationForm.css' // reuse the same form styling

const emptyForm = {
  company: '',
  jobTitle: '',
  interviewDate: '',
  interviewTime: '',
  interviewType: 'Video',
  meetingLink: '',
  interviewer: '',
  notes: '',
}

function InterviewForm({ initialData, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...emptyForm,
        ...initialData,
        interviewDate: initialData.interviewDate ? initialData.interviewDate.slice(0, 10) : '',
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.company.trim()) newErrors.company = 'Company is required'
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required'
    if (!formData.interviewDate) newErrors.interviewDate = 'Interview date is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    onSubmit(formData)
  }

  return (
    <form className="app-form" onSubmit={handleSubmit} noValidate>
      <div className="app-form-grid">
        <div className="form-group">
          <label>Company *</label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={errors.company ? 'input-error' : ''}
            placeholder="e.g. Google"
          />
          {errors.company && <span className="error-text">{errors.company}</span>}
        </div>

        <div className="form-group">
          <label>Job Title *</label>
          <input
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className={errors.jobTitle ? 'input-error' : ''}
            placeholder="e.g. Frontend Developer"
          />
          {errors.jobTitle && <span className="error-text">{errors.jobTitle}</span>}
        </div>

        <div className="form-group">
          <label>Interview Date *</label>
          <input
            type="date"
            name="interviewDate"
            value={formData.interviewDate}
            onChange={handleChange}
            className={errors.interviewDate ? 'input-error' : ''}
          />
          {errors.interviewDate && <span className="error-text">{errors.interviewDate}</span>}
        </div>

        <div className="form-group">
          <label>Interview Time</label>
          <input
            type="time"
            name="interviewTime"
            value={formData.interviewTime}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Interview Type</label>
          <select name="interviewType" value={formData.interviewType} onChange={handleChange}>
            <option>Phone</option>
            <option>Video</option>
            <option>Technical</option>
            <option>HR</option>
            <option>On-site</option>
          </select>
        </div>

        <div className="form-group">
          <label>Interviewer</label>
          <input name="interviewer" value={formData.interviewer} onChange={handleChange} placeholder="Name" />
        </div>

        <div className="form-group span-2">
          <label>Meeting Link</label>
          <input name="meetingLink" value={formData.meetingLink} onChange={handleChange} placeholder="https://..." />
        </div>

        <div className="form-group span-2">
          <label>Notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" />
        </div>
      </div>

      <div className="app-form-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Add Interview'}
        </button>
      </div>
    </form>
  )
}

export default InterviewForm