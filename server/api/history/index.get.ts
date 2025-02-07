import { H3Error } from 'h3'
import { getServerSession } from '#auth'
import History from '~/server/models/History'
import { safeCachedOperation } from '~/server/utils/db-helper'

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event)
    const query = getQuery(event)
    const deviceId = query.deviceId

    const historyQuery = session?.user?.id 
      ? { userId: session.user.id }
      : { deviceId }

    const cacheKey = `history:${session?.user?.id || deviceId}`

    const history = await safeCachedOperation(
      () => History.find(historyQuery)
        .sort({ watchedAt: -1 })
        .limit(10)
        .lean(),
      cacheKey,
      60, // Cache for 1 minute
      'Failed to fetch watch history'
    )

    return history

  } catch (error) {
    console.error('Error in history route:', error)
    
    if (error instanceof H3Error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Internal server error',
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
    })
  }
})
