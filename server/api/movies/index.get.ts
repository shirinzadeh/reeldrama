// server/api/movies/index.get.ts
import { H3Error } from 'h3'
import Movie from '~/server/models/Movie'
import { safeDbOperation } from '~/server/utils/db-helper'
import type { Movie as IMovie } from '~/types/movie'

export default defineEventHandler(async (event) => {
  try {
    // Get query parameters
    const query = getQuery(event)
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    const category = query.category as string
    const featured = query.featured === 'true'

    // Build filter
    const filter: any = {}
    if (category) filter.category = category
    if (featured) filter.isFeatured = true

    // Get total count for pagination
    const total = await safeDbOperation(
      () => Movie.countDocuments(filter),
      'Failed to count movies'
    )

    // Fetch movies with pagination
    const movies = await safeDbOperation(
      () => Movie.find(filter)
        .select('-__v')
        .sort('-releaseDate')
        .skip((page - 1) * limit)
        .limit(limit)
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
      data: movies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
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