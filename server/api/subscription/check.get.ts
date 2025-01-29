// import { requireAuth } from '~/server/middleware/auth';
// import {H3Error} from 'h3';
// export default defineEventHandler(async (event) => {
//   try {
//     const user = await requireAuth(event);
    
//     return {
//       hasActiveSubscription: user.hasActiveSubscription || false,
//       subscriptionExpiresAt: user.subscriptionExpiresAt || null
//     };
//   } catch (error) {
//     if (error instanceof H3Error) throw error;
//     throw createError({
//       statusCode: 500,
//       message: 'Error checking subscription status'
//     });
//   }
// });
