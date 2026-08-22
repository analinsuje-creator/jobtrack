import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Helper — creates a signed JWT containing the user's ID
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// @route   POST /api/auth/register
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    // Basic presence validation
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please provide name, email, and password')
    }

    // Check for an existing user with this email
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400)
      throw new Error('An account with this email already exists')
    }

    // Create the user — password gets hashed automatically by the pre('save') hook in User.js
    const user = await User.create({ name, email, password })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } catch (error) {
    next(error)
  }
}

// @route   POST /api/auth/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400)
      throw new Error('Please provide email and password')
    }

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  } catch (error) {
    next(error)
  }
}

// @route   GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    // req.user gets set by the authMiddleware before this function runs
    const user = await User.findById(req.user._id).select('-password')
    res.json(user)
  } catch (error) {
    next(error)
  }
}