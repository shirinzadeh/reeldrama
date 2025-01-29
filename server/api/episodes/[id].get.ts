import { H3Error } from 'h3';
import Episode from '~/server/models/Episode';
import connectToDatabase from '~/server/utils/db';

export default defineEventHandler(async (event) => {
  try {
    await connectToDatabase();
    
    const movieId = event.context.params?.id;
    if (!movieId) {
      throw createError({
        statusCode: 400,
        message: 'Movie ID is required'
      });
    }

    const episodes = await Episode.find({ movieId }).sort('order');
    
    if (!episodes) {
      throw createError({
        statusCode: 404,
        message: 'Episodes not found'
      });
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
