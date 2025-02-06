// server/models/Movie.ts
import { Schema, model } from 'mongoose'
import type { Movie as IMovie } from '~/types/movie'

const movieSchema = new Schema<IMovie>({
  title: {
    en: { type: String, required: true },
    tr: { type: String },
    ar: { type: String }
  },
  description: {
    en: { type: String, required: true },
    tr: { type: String },
    ar: { type: String }
  },
  tags: [{ type: String }],
  category: { 
    type: String, 
    required: true,
    index: true
  },
  thumbnail: { type: String, required: true },
  banner: { type: String, required: true },
  releaseDate: { 
    type: Date, 
    required: true,
    index: true
  },
  isFeatured: { 
    type: Boolean, 
    default: false,
    index: true
  },
  totalEpisodes: { 
    type: Number, 
    required: true,
    min: [1, 'Movie must have at least one episode'],
    validate: {
      validator: Number.isInteger,
      message: 'Total episodes must be an integer'
    }
  },
  freeEpisodes: { 
    type: Number, 
    required: true,
    min: [0, 'Free episodes cannot be negative'],
    validate: [
      {
        validator: Number.isInteger,
        message: 'Free episodes must be an integer'
      },
      {
        validator: function(value) {
          return value <= this.totalEpisodes;
        },
        message: 'Free episodes cannot exceed total episodes'
      }
    ]
  }
}, {
  timestamps: true
})

movieSchema.index({ category: 1, releaseDate: -1 })
movieSchema.index({ isFeatured: 1, releaseDate: -1 })
movieSchema.index({ totalEpisodes: 1 });

const Movie = model<IMovie>('Movie', movieSchema)
export default Movie