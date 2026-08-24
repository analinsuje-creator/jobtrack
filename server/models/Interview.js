import mongoose from 'mongoose'

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      default: null,
    },
    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true,
    },
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    interviewDate: {
      type: Date,
      required: [true, 'Interview date is required'],
    },
    interviewTime: {
      type: String,
      default: '',
    },
    interviewType: {
      type: String,
      enum: ['Phone', 'Video', 'Technical', 'HR', 'On-site'],
      default: 'Video',
    },
    meetingLink: {
      type: String,
      default: '',
    },
    interviewer: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

const Interview = mongoose.model('Interview', interviewSchema)

export default Interview