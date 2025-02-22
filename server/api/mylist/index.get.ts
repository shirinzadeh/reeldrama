import { H3Error } from 'h3'
import { getServerSession } from '#auth'
import { MyList } from '~/server/models/MyList'
import { safeDbOperation } from '~/server/utils/db-helper'

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event)
    
    // Return empty array for unauthenticated users
    if (!session?.user?.id) {
      return {
        statusCode: 200,
        success: true,
        data: []
      }
    }

    const items = await safeDbOperation(
      () => MyList.find({ userId: session.user.id })
        .sort({ createdAt: -1 }) // Sort by latest first
        .populate('movieId')
        .lean()
        .exec(),
      'Failed to fetch my list items'
    )
    
    return {
      statusCode: 200,
      success: true,
      data: items.map(item => item.movieId)
    }

  } catch (error) {
    console.error('Error in mylist route:', error)
    
    if (error instanceof H3Error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Internal server error'
    })
  }
})
