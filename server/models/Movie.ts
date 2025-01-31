// models/Movie.ts
import { Schema, model, Document } from 'mongoose';

interface TranslatedField {
  en: string;
  tr?: string;
  ar?: string;
}

export interface IMovie extends Document {
  title: TranslatedField;
  description: TranslatedField;
  tags: string[];
  category: string;
  thumbnail: string;
  banner: string;
  releaseDate: Date;
  isFeatured: boolean;
  totalEpisodes: number;
  freeEpisodes: number;
}

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
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  banner: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  isFeatured: { type: Boolean, default: false },
  totalEpisodes: { type: Number, required: true },
  freeEpisodes: { type: Number, required: true }
});

export default model<IMovie>('Movie', movieSchema);