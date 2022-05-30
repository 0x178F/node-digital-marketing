import mongoose from 'mongoose'

const payment = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    status:{
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
})

export default mongoose.model('payments', payment)