import mongoose from 'mongoose'

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise()
  }

  const config = useRuntimeConfig()
  const dbUrl = config.mongodbUri

  try {
    await mongoose.connect(dbUrl)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}

export default connectToDatabase
