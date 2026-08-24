import express from 'express'
import {
  getInterviews,
  getInterviewById,
  createInterview,
  updateInterview,
  deleteInterview,
} from '../controllers/interviewController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)

router.route('/').get(getInterviews).post(createInterview)
router.route('/:id').get(getInterviewById).put(updateInterview).delete(deleteInterview)

export default router