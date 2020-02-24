const axios = require('axios')
const Article = require('../model/Article')
const Sample = require('../model/Sample')
const removeDuplicate = require('../helper/removeDuplicate')

class ArticleController{
    static test(req,res)
    {
        res.json({ message: 'Article Connected' })
    }

    static masterFind(req,res,next)
    {
        Article.find()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }


    static masterDelete(req,res,next)
    {
        Article.remove()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }

    static addArticle(req,res,next)
    {
        console.log(' \n\n\n======================\n ADD ARTICLE')
        const { url, keyPoint } = req.body
        const UserId = req.decodedUser._id
        console.log(`TCL: ArticleController -> UserId`, UserId)

        Article.create({
            UserId, url, keyPoint
        })
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }

    static deleteArticle(req,res,next)
    {
        Article.findOneAndDelete({
            _id : req.params.articleId
        })
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }

    static removeDuplicate(req,res,next)
    {
        console.log(' \n\n\n======================\n REMOVE DUPLICATE')

        let redactedArticle = []
        Sample.create({
            originalArticle : req.body
        })
        .then(result=>{
            redactedArticle = removeDuplicate(req.body)
            return 
        })
        .then( ()=>{
            return axios({
                method: 'post',
                url: 'http://13.250.46.91:3000',
                data:{
                    isi_artikel : redactedArticle.join(' ')
                }
            })
        })
        .then( ({data})=>{
            res.status(200).json({
                originalArticle : req.body,
                redactedArticle,
                keyPoint: data
            })
        })
        .catch(err=>{
            next(err)
        })
        
    }


    // static removeDuplicate(req,res,next)
    // {
    //     // console.log(req.body[0])
    //     console.log(' \n\n\n======================\n REMOVE DUPLICATE')
    //     Sample.create({
    //         originalArticle : req.body
    //     })
    //     .then(result=>{
    //         res.status(200).json({ 
    //             originalArticle : req.body,
    //             redactedArticle : removeDuplicate(req.body) 
    //         })
    //     })
    //     .catch(err=>{
    //         next(err)
    //     })
        
    // }


    static demo(req,res,next)
    {
        console.log(' \n\n\n======================\n DEMO')
        const article = require(`../helper/articles sample/sample${req.body.index}`)
        console.log(`TCL: ArticleController -> article`, article)
        
        res.status(200).json({ 
            originalArticle : article,
            redactedArticle : removeDuplicate(article) 
        })
    }


}


module.exports = ArticleController