const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new Schema({
    caption: String,
    tags: [String],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    photo: String
}, {
    timestamps: true
})

const FileUpload = mongoose.model('FileUpload', fileSchema)
module.exports = FileUpload