import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'categories',
        required: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    account_date: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    mobile_confirmation: {
        type: Boolean,
        default: false
    },
    extra_info: {
        type:String
    }
}, {
    timestamps: true
})

export default mongoose.model('accounts', accountSchema)