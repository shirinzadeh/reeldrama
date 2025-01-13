import mongoose from 'mongoose'

// Define the Category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure category names are unique
  },
  slug: {
    type: String,
    required: true,
    unique: true, // Ensure slugs are unique
  },
  description: {
    type: String,
    default: '', // Optional description of the category
  },
  icon: {
    type: String,
    default: '', // Default icon from carbon collection
  },
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
})

// Export the model (prevent re-compilation if already loaded)
export default mongoose.models.Category || mongoose.model('Category', categorySchema)
