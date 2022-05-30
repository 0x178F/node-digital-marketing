import mongoose from 'mongoose'

const bankMethodsSchema = new mongoose.Schema({
    bankName: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    iban: {
        type: String,
    },
    accountNumber: {
        type: String,
    },
    sortCode: {
        type: String,
    },
    image: {
        type: String,
    },
    status:{
        type: Number,
        default: 0
    }
}, { timestamps: true })

export default mongoose.model('bank_methods', bankMethodsSchema)