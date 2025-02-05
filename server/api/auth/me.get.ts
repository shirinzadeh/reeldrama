// server/api/auth/me.get.ts
import { getServerSession } from '#auth'
import { User } from '~/server/models/user'
import { safeDbOperation } from '~/server/utils/db-helper'
import type { UserProfile } from '~/types/user'

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event)
    if (!session?.user?.email) {
      return {
        statusCode: 401,
        success: false,
        message: 'Unauthorized'
      }
    }

    const user = await safeDbOperation(
      () => User.findOne({ email: session.user.email })
        .select('email coins bonus')
        .lean()
        .exec(),
      'Failed to fetch user data'
    )

    if (!user) {
      return {
        statusCode: 404,
        success: false,
        message: 'User not found'
      }
    }

    const userProfile: UserProfile = {
      id: user._id.toString(),
      email: user.email,
      coins: user.coins,
      bonus: user.bonus
    }

    return {
      statusCode: 200,
      success: true,
      data: userProfile
    }

  } catch (error) {
    console.error('Error in me route:', error)
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Internal server error'
    })
  }
})