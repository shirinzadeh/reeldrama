import { H3Error } from 'h3'
import { getServerSession } from '#auth'
import { MyList } from '~/server/models/MyList'
import { safeDbOperation } from '~/server/utils/db-helper'

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event)
    if (!session?.user?.id) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const movieId = event.context.params?.id
    if (!movieId) {
      throw createError({ statusCode: 400, message: 'Movie ID is required' })
    }

    await safeDbOperation(
      () => MyList.findOneAndDelete({
        userId: session.user.id,
        movieId: movieId
      }),
      'Failed to remove movie from list'
    )

    return {
      statusCode: 200,
      success: true
    }

  } catch (error) {
    console.error('Error in mylist delete route:', error)
    
    if (error instanceof H3Error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Internal server error'
    })
  }
})
