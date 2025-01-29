import { Schema, model } from 'mongoose'

interface IUser {
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  coins: number
  bonus: number
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coins: { type: Number, default: 0 },
  bonus: { type: Number, default: 0 },
}, { timestamps: true })

export const User = model<IUser>('User', userSchema)
