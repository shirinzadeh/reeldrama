import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  free: {
    type: Boolean,
    default: false
  },
  videoUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Episode || mongoose.model('Episode', episodeSchema);
