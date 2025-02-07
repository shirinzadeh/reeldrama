import { getServerSession } from '#auth'
import History from '~/server/models/History'
import { safeDbOperation } from '~/server/utils/db-helper'

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

    return await safeDbOperation(async () => {
      // Use findOneAndUpdate with upsert for atomic operation
      const history = await History.findOneAndUpdate(
        {
          'movie._id': historyData.movie._id,
          ...(session?.user?.id ? { userId: session.user.id } : { deviceId })
        },
        {
          $set: {
            ...historyData,
            watchedAt: new Date(),
            ...(session?.user?.id && { userId: session.user.id })
          }
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true
        }
      )

      // Invalidate cache
      const cache = useStorage('cache')
      await cache.removeItem(`history:${session?.user?.id || deviceId}`)

      return history
    }, 'Failed to update watch history')
  } catch (error) {
    console.error('Error saving history:', error)
    throw createError({
      statusCode: 500,
      message: 'Error saving watch history'
    })
  }
})
