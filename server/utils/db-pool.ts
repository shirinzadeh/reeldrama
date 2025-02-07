import mongoose from 'mongoose'

class DatabasePool {
  private static instance: DatabasePool
  private poolPromise: Promise<typeof mongoose> | null = null
  private maxRetries = 3
  private retryDelay = 1000

  private constructor() {}

  static getInstance(): DatabasePool {
    if (!DatabasePool.instance) {
      DatabasePool.instance = new DatabasePool()
    }
    return DatabasePool.instance
  }

  async getConnection(): Promise<typeof mongoose> {
    if (!this.poolPromise) {
      this.poolPromise = this.createPool()
    }
    return this.poolPromise
  }

  private async createPool(): Promise<typeof mongoose> {
    const config = useRuntimeConfig()
    
    const options = {
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      serverSelectionTimeoutMS: 5000,
      keepAlive: true,
      keepAliveInitialDelay: 300000
    }

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const connection = await mongoose.connect(config.mongodbUri, options)
        console.log('MongoDB connection pool established')
        return connection
      } catch (error) {
        if (attempt === this.maxRetries) throw error
        await new Promise(resolve => setTimeout(resolve, this.retryDelay))
      }
    }

    throw new Error('Failed to establish database connection')
  }
}

export const dbPool = DatabasePool.getInstance()
