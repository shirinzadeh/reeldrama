import mongoose from 'mongoose'

const episodeSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  free: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.models.Episode || mongoose.model('Episode', episodeSchema)
