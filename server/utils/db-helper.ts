// server/utils/db-helper.ts
import mongoose from 'mongoose'

export async function safeDbOperation<T, R = T | null>(
  operation: () => Promise<R>,
  errorMessage: string = 'Database operation failed'
): Promise<R> {
  try {
    console.log('mongoose connect',mongoose.connection)
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected')
    }
    return await operation()
  } catch (error) {
    console.error(errorMessage, error)
    throw error
  }
}