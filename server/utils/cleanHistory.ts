import History from '../models/History'

export async function cleanupHistory() {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  try {
    // Remove anonymous user history older than 30 days
    await History.deleteMany({
      userId: { $exists: false },
      watchedAt: { $lt: thirtyDaysAgo }
    })

    // Keep only last 100 entries per user for authenticated users
    const users = await History.distinct('userId', { userId: { $exists: true } })
    
    for (const userId of users) {
      const userEntries = await History.find({ userId })
        .sort({ watchedAt: -1 })
        .skip(100) // Keep latest 100
        
      if (userEntries.length > 0) {
        const oldestEntryToKeep = userEntries[0].watchedAt
        await History.deleteMany({
          userId,
          watchedAt: { $lt: oldestEntryToKeep }
        })
      }
    }
  } catch (error) {
    console.error('Error cleaning up history:', error)
  }
}
