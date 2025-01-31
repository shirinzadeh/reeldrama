import mongoose from 'mongoose'

// Define the Category schema
const categorySchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    tr: { type: String, required: true },
    ar: { type: String, required: true }
  },
  slug: { type: String, required: true, unique: true },
  icon: String
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
})

// Export the model (prevent re-compilation if already loaded)
export default mongoose.models.Category || mongoose.model('Category', categorySchema)
