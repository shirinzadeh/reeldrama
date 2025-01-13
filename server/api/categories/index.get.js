import connectToDatabase from '~/server/utils/db'
import Category from '~/server/models/Category'

export default defineEventHandler(async () => {
  await connectToDatabase()

  try {
    const categories = await Category.find()
    return { success: true, data: categories }
  } catch (error) {
    console.error('Error fetching categories:', error)
    return { success: false, message: error.message }
  }
})
