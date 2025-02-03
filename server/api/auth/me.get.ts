import { getServerSession } from '#auth'
import { User } from '~/server/models/user'

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event)
    if (!session || !session.user || !session.user.email) {
      setResponseStatus(event, 401); // ✅ Proper HTTP status for unauthorized
      return {
        success: false,
        error: 'Unauthorized'
      }
    }

    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      setResponseStatus(event, 404); // ✅ Proper HTTP status for not found
      return {
        success: false,
        error: 'User not found'
      }
    }

    return {
      success: true,
      data: {
        id: user._id.toString(),
        email: user.email,
        coins: user.coins,
        bonus: user.bonus
      }
    }
  } catch (error) {
    setResponseStatus(event, 500); // ✅ Ensure status is always set
    return {
      success: false,
      error: 'Failed to fetch user data'
    }
  }
})
