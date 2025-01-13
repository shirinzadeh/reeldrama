import connectToDatabase from '~/server/utils/db';
import Episode from '~/server/models/Episode';

export default defineEventHandler(async (event) => {
  await connectToDatabase();

  const { id: movieId } = event.context.params;

  try {
    // Fetch episode by ID
    const episodes = await Episode.find({ movieId }).lean();

    return { success: true, data: episodes };
  } catch (error) {
    console.error('Error fetching episode:', error);
    return { success: false, message: error.message };
  }
});
