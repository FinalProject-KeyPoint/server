/* istanbul ignore file */

const Sample = require('../model/Sample')

class SampleController{
    static test(req,res,next)
    {
        res.json({ message : 'Sample Connected' })
    }

    static count(req,res,next)
    {
        Sample.estimatedDocumentCount()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }

    static masterFind(req,res,next)
    {
        Sample.find()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }

    static masterDelete(req,res,next)
    {
        Sample.remove()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }
}   


module.exports = SampleController