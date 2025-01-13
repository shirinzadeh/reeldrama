import mongoose from 'mongoose'

const packageSchema = new mongoose.Schema({
    id: Number,
    coins: Number,
    bonus: Number,
    bonusPercentage: Number,
    price: Number,
    isNewUserOnly: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Package', packageSchema)
