import { useState, useEffect } from 'react'
import './ApplicationForm.css'

const emptyForm = {
  companyName: '',
  jobTitle: '',
  jobType: 'Full-time',
  location: '',
  workMode: 'On-site',
  salary: '',
  applicationDate: '',
  jobUrl: '',
  status: 'Applied',
  contactPerson: '',
  contactEmail: '',
  followUpDate: '',
  notes: '',
}

function ApplicationForm({ initialData, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...emptyForm,
        ...initialData,
        applicationDate: initialData.applicationDate
          ? initialData.applicationDate.slice(0, 10)
          : '',
        followUpDate: initialData.followUpDate ? initialData.followUpDate.slice(0, 10) : '',
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required'
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
          <label>Company Name *</label>
          <input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={errors.companyName ? 'input-error' : ''}
            placeholder="e.g. Google"
          />
          {errors.companyName && <span className="error-text">{errors.companyName}</span>}
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
          <label>Job Type</label>
          <select name="jobType" value={formData.jobType} onChange={handleChange}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Contract</option>
            <option>Freelance</option>
          </select>
        </div>

        <div className="form-group">
          <label>Work Mode</label>
          <select name="workMode" value={formData.workMode} onChange={handleChange}>
            <option>Remote</option>
            <option>Hybrid</option>
            <option>On-site</option>
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Bangalore" />
        </div>

        <div className="form-group">
          <label>Salary</label>
          <input name="salary" value={formData.salary} onChange={handleChange} placeholder="e.g. ₹12 LPA" />
        </div>

        <div className="form-group">
          <label>Application Date</label>
          <input type="date" name="applicationDate" value={formData.applicationDate} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Applied</option>
            <option>Under Review</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
            <option>Withdrawn</option>
          </select>
        </div>

        <div className="form-group span-2">
          <label>Job URL</label>
          <input name="jobUrl" value={formData.jobUrl} onChange={handleChange} placeholder="https://..." />
        </div>

        <div className="form-group">
          <label>Contact Person</label>
          <input name="contactPerson" value={formData.contactPerson} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Contact Email</label>
          <input name="contactEmail" value={formData.contactEmail} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Follow-up Date</label>
          <input type="date" name="followUpDate" value={formData.followUpDate} onChange={handleChange} />
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
          {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Add Application'}
        </button>
      </div>
    </form>
  )
}

export default ApplicationForm