import { H3Error } from 'h3';
import Episode from '~/server/models/Episode';
import { safeDbOperation } from '~/server/utils/db-helper'

export default defineEventHandler(async (event) => {
  try {
    const movieId = getRouterParam(event, 'id')
    if (!movieId) {
      throw createError({
        statusCode: 400,
        message: 'Movie ID is required'
      })
    }

    const episodes = await safeDbOperation(
      () => Episode.find({ movieId })
        .sort('order')
        .lean()
        .exec(),
      'Failed to fetch episodes'
    )
    
    if (!episodes || episodes.length === 0) { // ✅ Check for empty array
      setResponseStatus(event, 404); // ✅ Proper HTTP status
      return {
        success: false,
        message: 'No episodes found'
      };
    }

    return episodes;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    
    // If it's already an H3Error, throw it directly
    if (error instanceof H3Error) {
      throw error;
    }

    // Otherwise create a new error
    throw createError({
      statusCode: 500,
      message: 'Error fetching episodes',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
});
