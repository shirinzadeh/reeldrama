import mongoose from 'mongoose'
import { dbPool } from './db-pool'

export async function safeDbOperation<T>(
  operation: () => Promise<T>,
  errorMessage: string = 'Database operation failed'
): Promise<T> {
  try {
    await dbPool.getConnection()
    return await operation()
  } catch (error) {
    console.error(`${errorMessage}:`, error)
    throw createError({
      statusCode: 500,
      message: errorMessage
    })
  }
}

// Define an interface for the cache structure
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export async function safeCachedOperation<T>(
  operation: () => Promise<T>,
  cacheKey: string,
  ttl: number = 300, // 5 minutes default
  errorMessage: string = 'Operation failed'
): Promise<T> {
  const cache = useStorage('cache')
  
  try {
    // Check cache first
    const cached = await cache.getItem(cacheKey) as CacheItem<T> | null
    
    if (cached && cached.timestamp && (Date.now() - cached.timestamp) < ttl * 1000) {
      return cached.data
    }

    // If not in cache, execute operation
    const data = await safeDbOperation(operation, errorMessage)
    
    // Cache the result
    await cache.setItem(cacheKey, {
      data,
      timestamp: Date.now()
    } as CacheItem<T>)

    return data
  } catch (error) {
    console.error(`${errorMessage}:`, error)
    throw error
  }
}