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

    const body = await readBody(event)
    if (!body.movieId) {
      throw createError({ statusCode: 400, message: 'Movie ID is required' })
    }

    const exists = await safeDbOperation(
      () => MyList.findOne({ 
        userId: session.user.id, 
        movieId: body.movieId 
      }).lean(),
      'Failed to check existing list item'
    )

    if (!exists) {
      await safeDbOperation(
        () => MyList.create({ 
          userId: session.user.id, 
          movieId: body.movieId 
        }),
        'Failed to add movie to list'
      )
    }

    return {
      statusCode: 200,
      success: true
    }

  } catch (error) {
    console.error('Error in mylist post route:', error)
    
    if (error instanceof H3Error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Internal server error'
    })
  }
})
