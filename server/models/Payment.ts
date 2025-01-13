import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Package'
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        required: true,
        enum: ['credit-card', 'paypal']
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    gatewayResponse: Object
}, {
    timestamps: true
})

export default mongoose.model('Payment', paymentSchema)
