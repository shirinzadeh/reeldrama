import { Schema, model } from 'mongoose'

const historySchema = new Schema({
    userId: {
        type: String,
        required: false,
        index: true
    },
    movie: {
        _id: {  // Changed from 'id' to '_id' to match Mongoose conventions
            type: Schema.Types.ObjectId,
            ref: 'Movie',
            required: true
        },
        title: {
            en: String,
            tr: String,
            ar: String
        },
        thumbnail: String,
        totalEpisodes: Number
    },
    episode: {
        _id: {  // Changed from 'id' to '_id' to match Mongoose conventions
            type: Schema.Types.ObjectId,
            ref: 'Episode',
            required: true
        },
        number: Number
    },
    progress: {
        type: Number,
        default: 0
    },
    deviceId: {
        type: String,
        required: true
    },
    watchedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

// Compound index for efficient queries
historySchema.index({ userId: 1, watchedAt: -1 })
historySchema.index({ deviceId: 1, watchedAt: -1 })

export default model('History', historySchema)
