// server/models/UserProgress.js
import mongoose from 'mongoose'

const userProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  progress: { type: Number, required: true }, // Progress in seconds
  lastWatched: { type: Date, default: Date.now }
})

export default mongoose.models.UserProgress || mongoose.model('UserProgress', userProgressSchema)
