// server/api/movies/[id]/index.get.ts
import { H3Error } from 'h3'
import Movie, { IMovie } from '~/server/models/Movie'
import { safeDbOperation } from '~/server/utils/db-helper'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Movie ID is required'
      })
    }

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid movie ID format'
      })
    }

    const movie = await safeDbOperation(
      () => Movie.findById(id)
        .select('-__v')
        .lean<IMovie>()
        .exec(),
      'Failed to fetch movie'
    )

    if (!movie) {
      return {
        statusCode: 404,
        success: false,
        message: 'Movie not found'
      }
    }

    return {
      statusCode: 200,
      success: true,
      data: movie
    }

  } catch (error) {
    console.error('Error in movie route:', error)
    
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