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
  totalEpisodes: { type: Number, required: true },
  freeEpisodes: { type: Number, required: true }
}, {
  timestamps: true
})

movieSchema.index({ category: 1, releaseDate: -1 })
movieSchema.index({ isFeatured: 1, releaseDate: -1 })

const Movie = model<IMovie>('Movie', movieSchema)
export default Movie