import { getServerSession } from '#auth'
import History from '~/server/models/History'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  const query = getQuery(event)
  const deviceId = query.deviceId

  let historyQuery = {}
  
  if (session?.user?.id) {
    historyQuery = { userId: session.user.id }
  } else if (deviceId) {
    historyQuery = { deviceId }
  } else {
    throw createError({
      statusCode: 400,
      message: 'Device ID is required for unauthenticated users'
    })
  }

  // No need to populate since we store the needed data directly
  const history = await History.find(historyQuery)
    .sort({ watchedAt: -1 })
    .limit(10)
    .lean()

  return history
})
