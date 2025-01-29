import { Schema, model } from 'mongoose'

interface IUser {
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true })

export const User = model<IUser>('User', userSchema)
