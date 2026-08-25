import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import applicationRoutes from './routes/applicationRoutes.js'
import interviewRoutes from './routes/interviewRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { apiLimiter } from './middleware/rateLimiter.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

// ===== Security middleware =====
app.use(helmet())

// Lock CORS down to just our frontend's origin instead of allowing everything
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174', // in case the default port is busy, per earlier phases
]
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
  })
)

app.use(express.json())

// Strips out any MongoDB operator characters ($, .) from user input,
// preventing NoSQL injection attempts through query params or body
app.use(mongoSanitize())

// Apply a general rate limit to all API routes
app.use('/api', apiLimiter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'JobTrack API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/interviews', interviewRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})