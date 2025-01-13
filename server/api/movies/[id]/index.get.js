import connectToDatabase from '~/server/utils/db';
import Movie from '~/server/models/Movie';

export default defineEventHandler(async (event) => {
  await connectToDatabase();

  const { id } = event.context.params;

  try {
    // Fetch movie details without fetching episodes
    const movie = await Movie.findById(id).lean(); // Use `lean` to return a plain object.
    if (!movie) {
      throw new Error('Movie not found');
    }

    // Return only movie details
    return { 
      success: true, 
      data: movie 
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return { success: false, message: error.message };
  }
});
