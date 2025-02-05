// server/models/Package.ts
import { Schema, model } from 'mongoose'
import type { Package } from '~/types/package'

const packageSchema = new Schema<Package>({
  id: { 
    type: Number, 
    required: true,
    unique: true,
    index: true
  },
  coins: { 
    type: Number, 
    required: true,
    min: [0, 'Coins cannot be negative']
  },
  bonus: { 
    type: Number, 
    required: true,
    min: [0, 'Bonus cannot be negative']
  },
  bonusPercentage: { 
    type: Number, 
    required: true,
    min: [0, 'Bonus percentage cannot be negative'],
    max: [100, 'Bonus percentage cannot exceed 100']
  },
  price: { 
    type: Number, 
    required: true,
    min: [0, 'Price cannot be negative']
  },
  isNewUserOnly: {
    type: Boolean,
    default: false,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true
})

// Add compound indexes for common queries
packageSchema.index({ isActive: 1, price: 1 })
packageSchema.index({ isActive: 1, isNewUserOnly: 1 })

export default model<Package>('Package', packageSchema)