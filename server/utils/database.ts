// server/utils/database.ts
import mongoose from 'mongoose'
import { defineNitroPlugin } from 'nitropack/runtime/plugin'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  
  try {
    if (mongoose.connection.readyState === 0) {
      const options = {
        maxPoolSize: 10,
        minPoolSize: 5,
        socketTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000
      }

      await mongoose.connect(config.mongodbUri, options)
      console.log('Connected to MongoDB')
      
      // Handle connection events
      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err)
      })

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected')
      })

      // Graceful shutdown
      process.on('SIGINT', async () => {
        await mongoose.connection.close()
        process.exit(0)
      })
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
})