const Article = require('../model/Article')

module.exports = (req,res,next)=>{
    console.log(`
        AUTHORIZATION IS RUNNING
        ========================
    `);
    
    Article.findOne({
        _id : req.params.articleId
    })
    .then(result=>{
    console.log(`TCL: result`, result)
    console.log(`TCL: req.decodedUser._id`, req.decodedUser._id)

        if( String(result.UserId) === String(req.decodedUser._id))
        {
            next()
        }
        else
            throw({ status: 403, message:'UnAuthorized Access'})
    })
    .catch(err=>{
        next(err)
    })
}