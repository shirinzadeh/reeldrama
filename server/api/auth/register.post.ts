import { User } from '~/server/models/user'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

    if (!email || !password) {
      return {
        success: false,
        error: 'Email and password are required'
      }
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return {
        success: false,
        error: 'Email already registered'
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const user = await User.create({
      email,
      password: hashedPassword,
      coins: 0,
      bonus: 100 
    })

    return {
      success: true,
      message: 'Registration successful',
      user: {
        id: user._id.toString(),
        email: user.email
      }
    }
  } catch (error) {
    return {
      success: false,
      error: 'An error occurred during registration'
    }
  }
})

