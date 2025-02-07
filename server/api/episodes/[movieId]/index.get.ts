import { H3Error } from 'h3'
import Episode from '~/server/models/Episode'
import { safeDbOperation } from '~/server/utils/db-helper'

export default defineEventHandler(async (event) => {
  try {
    const movieId = getRouterParam(event, 'movieId')
    
    if (!movieId) {
      throw createError({
        statusCode: 400,
        message: 'Movie ID is required'
      })
    }

    const episodes = await safeDbOperation(
      () => Episode.find({ movieId })
        .sort({ number: 1 })
        .select('-__v')
        .lean()
        .exec(),
      'Failed to fetch episodes'
    )

    return {
      success: true,
      data: episodes || []
    }

  } catch (error) {
    console.error('Error fetching episodes:', error)
    
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
