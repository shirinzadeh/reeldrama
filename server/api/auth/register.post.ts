// server/api/auth/register/index.post.ts
import { H3Error } from 'h3'
import bcrypt from 'bcrypt'
import { User } from '~/server/models/user'
import { safeDbOperation } from '~/server/utils/db-helper'
import type { User as IUser } from '~/types/user'

interface RegisterBody {
  email: string
  password: string
}

interface RegisterResponse {
  success: boolean
  message?: string
  error?: string
  user?: {
    id: string
    email: string
  }
}

export default defineEventHandler(async (event): Promise<RegisterResponse> => {
  try {
    const body = await readBody<RegisterBody>(event)
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email and password are required'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid email format'
      })
    }

    // Validate password strength
    if (password.length < 8) {
      throw createError({
        statusCode: 400,
        message: 'Password must be at least 8 characters long'
      })
    }

    // Check for existing user
    const existingUser = await safeDbOperation(
      () => User.findOne({ email })
        .select('email')
        .lean()
        .exec(),
      'Failed to check existing user'
    )

    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: 'Email already registered'
      })
    }

    // Hash password with proper error handling
    let hashedPassword: string
    try {
      hashedPassword = await bcrypt.hash(password, 10)
    } catch (error) {
      console.error('Password hashing failed:', error)
      throw createError({
        statusCode: 500,
        message: 'Error processing registration'
      })
    }

    // Create new user
    const newUser = await safeDbOperation(
      () => User.create({
        email,
        password: hashedPassword,
        coins: 0,
        bonus: 100 // Welcome bonus
      }),
      'Failed to create user'
    )

    // Return success response with user data
    return {
      success: true,
      message: 'Registration successful',
      user: {
        id: newUser._id.toString(),
        email: newUser.email
      }
    }

  } catch (error) {
    console.error('Registration error:', error)

    if (error instanceof H3Error) {
      throw error
    }

    // Handle different types of errors
    if (error instanceof Error) {
      if (error.message.includes('duplicate key')) {
        throw createError({
          statusCode: 409,
          message: 'Email already registered'
        })
      }

      if (error.message.includes('validation failed')) {
        throw createError({
          statusCode: 400,
          message: 'Invalid registration data'
        })
      }
    }

    throw createError({
      statusCode: 500,
      message: 'An error occurred during registration',
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
    })
  }
})