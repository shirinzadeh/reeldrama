import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  title: {
    en: { type: String, required: true },
    tr: { type: String, required: true },
    ar: { type: String, required: true }
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
  },
  number: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Add index for better query performance
episodeSchema.index({ movieId: 1, number: 1 });

export default mongoose.models.Episode || mongoose.model('Episode', episodeSchema);
