// server/models/Language.ts
import { Schema, model } from 'mongoose'
import type { Language } from '~/types/language'

const languageSchema = new Schema<Language>({
  code: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  native: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  isDefault: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true
})

// Add compound index for common queries
languageSchema.index({ isActive: 1, isDefault: 1 })

const Language = model<Language>('Language', languageSchema)
export default Language