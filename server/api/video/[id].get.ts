// import { getUserFromToken } from '~/server/middleware/auth';
// import Episode from '~/server/models/Episode';
// import connectToDatabase from '~/server/utils/db';
// import { H3Error } from 'h3'

// export default defineEventHandler(async (event) => {
//   try {
//     await connectToDatabase();
    
//     const user = await getUserFromToken(event);
//     const episodeId = event.context.params?.id;

//     if (!episodeId) {
//       throw createError({
//         statusCode: 400,
//         message: 'Episode ID is required'
//       });
//     }

//     const episode = await Episode.findById(episodeId);
    
//     if (!episode) {
//       throw createError({
//         statusCode: 404,
//         message: 'Episode not found'
//       });
//     }

//     // Check if episode is free or user has subscription
//     if (!episode.free && (!user || !user.hasActiveSubscription)) {
//       throw createError({
//         statusCode: 403,
//         message: 'Premium subscription required to access this content'
//       });
//     }

//     // Here you would implement actual video streaming logic
//     // This is just a placeholder for the security check
//     return {
//       success: true,
//       videoUrl: episode.videoUrl
//     };
//   } catch (error) {
//     console.error('Error streaming video:', error);
//     if (error instanceof H3Error) throw error;
//     throw createError({
//       statusCode: 500,
//       message: 'Error streaming video',
//       stack: error instanceof Error ? error.stack : undefined
//     });
//   }
// });
