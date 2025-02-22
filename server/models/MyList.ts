import { Schema, model } from 'mongoose'

const myListSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  movieId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Movie'
  }
}, {
  timestamps: true
})

myListSchema.index({ userId: 1, movieId: 1 }, { unique: true })

export const MyList = model('MyList', myListSchema)
