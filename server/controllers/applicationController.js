import Application from '../models/Application.js'

export const getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(applications)
  } catch (error) {
    next(error)
  }
}

export const getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)

    if (!application) {
      res.status(404)
      throw new Error('Application not found')
    }

    if (application.user.toString() !== req.user._id.toString()) {
      res.status(403)
      throw new Error('Not authorized to access this application')
    }

    res.json(application)
  } catch (error) {
    next(error)
  }
}

export const createApplication = async (req, res, next) => {
  try {
    const { companyName, jobTitle } = req.body

    if (!companyName || !jobTitle) {
      res.status(400)
      throw new Error('Company name and job title are required')
    }

    const application = await Application.create({
      ...req.body,
      user: req.user._id,
    })

    res.status(201).json(application)
  } catch (error) {
    next(error)
  }
}

export const updateApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)

    if (!application) {
      res.status(404)
      throw new Error('Application not found')
    }

    if (application.user.toString() !== req.user._id.toString()) {
      res.status(403)
      throw new Error('Not authorized to update this application')
    }

    const updated = await Application.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.json(updated)
  } catch (error) {
    next(error)
  }
}

export const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)

    if (!application) {
      res.status(404)
      throw new Error('Application not found')
    }

    if (application.user.toString() !== req.user._id.toString()) {
      res.status(403)
      throw new Error('Not authorized to delete this application')
    }

    await application.deleteOne()

    res.json({ message: 'Application deleted successfully' })
  } catch (error) {
    next(error)
  }
}