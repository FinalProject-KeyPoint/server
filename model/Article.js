const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    UserId : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type: String,
        required: [true, 'Title is required']
    },
    url : {
        type: String,
        required: [true, 'Url is required']
    },
    keyPoint:[{
        type: String
    }]
})

const Article = mongoose.model('Articles', articleSchema)
module.exports = Article