// server/plugins/mongodb.ts
import mongoose from 'mongoose'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin({
  name: 'mongodb',
  enforce: 'pre', // This ensures the plugin runs before others
  async setup() {
    const config = useRuntimeConfig()
    
    // Only run this on the server side
    if (import.meta.server) {
      try {
        const mongodbUri = config.mongodbUri
        
        if (!mongodbUri) {
          throw new Error('MONGODB_URI is not defined')
        }

        if (mongoose.connection.readyState === 0) {
          await mongoose.connect(mongodbUri, {
            maxPoolSize: 10,
            minPoolSize: 5,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
          })
          
          mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected. Attempting to reconnect...')
          })
          mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err)
          })
          console.log('MongoDB connected successfully')
        }
      } catch (error) {
        console.error('Failed to connect to MongoDB:', error)
        throw error
      }
    }
  }
})