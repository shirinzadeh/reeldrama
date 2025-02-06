import { getServerSession } from '#auth'
import History from '~/server/models/History'
import Movie from '~/server/models/Movie'
import Episode from '~/server/models/Episode'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  const body = await readBody(event)
  const { movie, episode, progress, deviceId } = body

  if (!movie?.id || !episode?.id || !deviceId) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields'
    })
  }

  try {
    // Transform the data to match schema
    const historyData = {
      movie: {
        _id: movie.id,
        title: movie.title,
        thumbnail: movie.thumbnail,
        totalEpisodes: movie.totalEpisodes
      },
      episode: {
        _id: episode.id,
        number: episode.number
      },
      progress,
      deviceId
    }

    // Find existing history entry
    const existingEntry = await History.findOne({
      'movie._id': historyData.movie._id,
      ...(session?.user?.id ? { userId: session.user.id } : { deviceId })
    })

    if (existingEntry) {
      // Update if progress is higher or episode changed
      if (progress > existingEntry.progress || !existingEntry.episode || existingEntry.episode._id.toString() !== historyData.episode._id) {
        existingEntry.progress = progress
        existingEntry.episode = historyData.episode
        await existingEntry.save()
      }
      return existingEntry
    }

    // Create new history entry
    const historyEntry = await History.create({
      ...historyData,
      ...(session?.user?.id && { userId: session.user.id })
    })

    return historyEntry
  } catch (error) {
    console.error('Error saving history:', error)
    throw createError({
      statusCode: 500,
      message: 'Error saving watch history'
    })
  }
})
