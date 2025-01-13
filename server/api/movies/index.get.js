import connectToDatabase from '~/server/utils/db'
import Movie from '~/server/models/Movie'

export default defineEventHandler(async (event) => {
  await connectToDatabase()
  
  try {
    const movies = await Movie.find({})
    return { success: true, data: movies }
  } catch (error) {
    console.error('Error fetching movies:', error)
    return { success: false, message: error.message }
  }
})
