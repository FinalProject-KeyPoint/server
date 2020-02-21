const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    UserID : {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    url : {
        type: String,
        required: [true, 'Url is required']
    }
})

const Article = mongoose.model('Articles', articleSchema)
module.exports = Article