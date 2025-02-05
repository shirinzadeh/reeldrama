import connectToDatabase from '~/server/utils/database'
import Category from '~/server/models/Category'

export default defineEventHandler(async () => {
  await connectToDatabase()

  try {
    const categories = await Category.find()
    return { success: true, data: categories }
  } catch (error) {
    console.error('Error fetching categories:', error)
    setResponseStatus(event, 500); // ✅ Ensure proper HTTP status
    return { success: false, message: error.message }
  }
})
