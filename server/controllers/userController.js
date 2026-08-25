import bcrypt from 'bcryptjs'
import User from '../models/User.js'

// @route   GET /api/users/profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.json(user)
  } catch (error) {
    next(error)
  }
}

// @route   PUT /api/users/profile
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }

    const { name, email, phone, location, title } = req.body

    // If the email is changing, make sure it's not already taken by someone else
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email })
      if (emailExists) {
        res.status(400)
        throw new Error('That email is already in use')
      }
      user.email = email
    }

    if (name !== undefined) user.name = name
    if (phone !== undefined) user.phone = phone
    if (location !== undefined) user.location = location
    if (title !== undefined) user.title = title

    const updated = await user.save()

    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      phone: updated.phone,
      location: updated.location,
      title: updated.title,
      createdAt: updated.createdAt,
    })
  } catch (error) {
    next(error)
  }
}

// @route   PUT /api/users/change-password
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      res.status(400)
      throw new Error('Please provide your current and new password')
    }

    if (newPassword.length < 6) {
      res.status(400)
      throw new Error('New password must be at least 6 characters')
    }

    const user = await User.findById(req.user._id)

    const isMatch = await user.matchPassword(currentPassword)
    if (!isMatch) {
      res.status(401)
      throw new Error('Current password is incorrect')
    }

    user.password = newPassword // pre('save') hook in User.js will hash this automatically
    await user.save()

    res.json({ message: 'Password updated successfully' })
  } catch (error) {
    next(error)
  }
}

// @route   DELETE /api/users/account
export const deleteAccount = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }

    await user.deleteOne()

    res.json({ message: 'Account deleted successfully' })
  } catch (error) {
    next(error)
  }
}