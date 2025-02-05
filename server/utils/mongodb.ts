// server/utils/mongodb.ts
import mongoose from 'mongoose'
import { defineNitroPlugin } from 'nitropack/runtime/plugin'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  
  try {
    if (!config.mongodbUri) {
      console.error('MONGODB_URI is not defined')
      throw new Error('MONGODB_URI is not defined')
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(config.mongodbUri, {
        maxPoolSize: 10,
        minPoolSize: 5,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4,
        retryWrites: true,
        w: 'majority'
      })
      
      mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully')
      })

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected. Attempting to reconnect...')
      })

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err)
      })

      // Handle process termination
      process.on('SIGINT', async () => {
        await mongoose.connection.close()
        process.exit(0)
      })
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
})