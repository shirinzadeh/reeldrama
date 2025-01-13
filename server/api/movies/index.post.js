import connectToDatabase from '~/server/utils/db'
import Movie from '~/server/models/Movie'

export default defineEventHandler(async (event) => {
  await connectToDatabase()

  const body = await readBody(event)

  try {
    const newMovie = new Movie(body)
    await newMovie.save()
    return { success: true, data: newMovie }
  } catch (error) {
    return { success: false, message: error.message }
  }
})
