// server/models/Movie.js
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  category: { type: String, required: true },
  thumbnail: { type: String },
  banner: { type: String },
  releaseDate: { type: Date, default: Date.now },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Movie || mongoose.model('Movie', movieSchema);
