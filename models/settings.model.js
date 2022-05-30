import mongoose from 'mongoose'

//create schema
const settingsSchema = new mongoose.Schema({
    settings: {
        type: Object
    }
})

export default mongoose.model('settings', settingsSchema)