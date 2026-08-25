import express from 'express'
import {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)

router.route('/profile').get(getProfile).put(updateProfile)
router.put('/change-password', changePassword)
router.delete('/account', deleteAccount)

export default router