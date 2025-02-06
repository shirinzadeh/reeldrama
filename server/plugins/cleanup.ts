import { cleanupHistory } from '../utils/cleanHistory'

export default defineNitroPlugin(() => {
  // Run cleanup every 24 hours
  setInterval(async () => {
    console.log('Running history cleanup...')
    await cleanupHistory()
  }, 24 * 60 * 60 * 1000)

  // Run once on startup
  cleanupHistory()
})
