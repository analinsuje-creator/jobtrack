import Interview from '../models/Interview.js'

// @route   GET /api/interviews
export const getInterviews = async (req, res, next) => {
  try {
    // Sort by interview date ascending — soonest first, per the spec
    const interviews = await Interview.find({ user: req.user._id }).sort({ interviewDate: 1 })
    res.json(interviews)
  } catch (error) {
    next(error)
  }
}

// @route   GET /api/interviews/:id
export const getInterviewById = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id)

    if (!interview) {
      res.status(404)
      throw new Error('Interview not found')
    }

    if (interview.user.toString() !== req.user._id.toString()) {
      res.status(403)
      throw new Error('Not authorized to access this interview')
    }

    res.json(interview)
  } catch (error) {
    next(error)
  }
}

// @route   POST /api/interviews
export const createInterview = async (req, res, next) => {
  try {
    const { company, jobTitle, interviewDate } = req.body

    if (!company || !jobTitle || !interviewDate) {
      res.status(400)
      throw new Error('Company, job title, and interview date are required')
    }

    const interview = await Interview.create({
      ...req.body,
      user: req.user._id,
    })

    res.status(201).json(interview)
  } catch (error) {
    next(error)
  }
}

// @route   PUT /api/interviews/:id
export const updateInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id)

    if (!interview) {
      res.status(404)
      throw new Error('Interview not found')
    }

    if (interview.user.toString() !== req.user._id.toString()) {
      res.status(403)
      throw new Error('Not authorized to update this interview')
    }

    const updated = await Interview.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.json(updated)
  } catch (error) {
    next(error)
  }
}

// @route   DELETE /api/interviews/:id
export const deleteInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id)

    if (!interview) {
      res.status(404)
      throw new Error('Interview not found')
    }

    if (interview.user.toString() !== req.user._id.toString()) {
      res.status(403)
      throw new Error('Not authorized to delete this interview')
    }

    await interview.deleteOne()

    res.json({ message: 'Interview deleted successfully' })
  } catch (error) {
    next(error)
  }
}