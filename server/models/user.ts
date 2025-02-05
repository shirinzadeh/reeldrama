// server/models/User.ts
import { Schema, model } from 'mongoose'
import type { User as UserI } from '~/types/user'

const userSchema = new Schema<UserI>({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    index: true,
    validate: {
      validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      message: 'Invalid email format'
    }
  },
  password: { 
    type: String, 
    required: true,
    minlength: [8, 'Password must be at least 8 characters long']
  },
  coins: { 
    type: Number, 
    default: 0,
    index: true,
    min: [0, 'Coins cannot be negative']
  },
  bonus: { 
    type: Number, 
    default: 0,
    min: [0, 'Bonus cannot be negative']
  }
}, { 
  timestamps: true 
})

export const User = model<UserI>('User', userSchema)