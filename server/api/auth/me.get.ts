import { getServerSession } from '#auth'
import { User } from '~/server/models/user'

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event)
    if (!session || !session.user || !session.user.email) {
        return { 
          success: false,
          error: 'Unauthorized'
        }
      }

    const user = await User.findOne({ email: session.user.email })
    if (!user) {
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
    return {
      success: false,
      error: 'Failed to fetch user data'
    }
  }
})
