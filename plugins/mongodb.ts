// server/plugins/mongodb.ts
import mongoose from 'mongoose'
import { defineNitroPlugin } from 'nitropack/runtime/plugin'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  
  if (!config.mongodbUri) {
    console.error('MONGODB_URI is not defined in environment variables')
    throw new Error('MONGODB_URI is required')
  }

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(config.mongodbUri, {
        maxPoolSize: 10,
        minPoolSize: 5,
        socketTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000
      })
      
      console.log('MongoDB connected successfully')
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
})