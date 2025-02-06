// server/api/movies/index.get.ts
import { H3Error } from 'h3'
import Movie from '~/server/models/Movie'
import { safeDbOperation } from '~/server/utils/db-helper'
import type { Movie as IMovie } from '~/types/movie'

export default defineEventHandler(async (event) => {
  try {
    const movies = await safeDbOperation(
      () => Movie.find({})
        .select('-__v')
        .sort('-releaseDate')  // Sort by release date, newest first
        .lean<IMovie[]>()
        .exec(),
      'Failed to fetch movies'
    )

    if (!movies?.length) {
      return {
        statusCode: 404,
        success: false,
        message: 'No movies found'
      }
    }

    return {
      statusCode: 200,
      success: true,
      data: movies
    }

  } catch (error) {
    console.error('Error in movies route:', error)
    
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