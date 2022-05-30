import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    slug: {
        type:String,
        required: true
    },
    image: {
        type:String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default mongoose.model('categories', categorySchema)