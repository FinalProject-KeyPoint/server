const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    originalArticle: [{
        type: String
    }],
    redactedArticle: [{
        type: String
    }],
    keyPoints: [{
        type: String
    }]
})

const Article = mongoose.model('Articles', articleSchema)
module.exports = Article