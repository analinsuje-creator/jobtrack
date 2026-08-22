import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    phone: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
)

// Runs automatically before a user document is saved to the database
userSchema.pre('save', async function () {
  // Only hash the password if it's new or being changed
  if (!this.isModified('password')) {
    return
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Custom method we can call on any user document to check a login password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User