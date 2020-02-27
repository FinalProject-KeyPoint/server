const User = require('../model/User')
const { generateToken } = require('../helper/jwt')
const { verifyHash } = require('../helper/bcryptjs')

class UserController{
    // static test(req,res)
    // {
    //     res.json({ message: 'User Connected' })
    // }

    // static masterFind(req,res,next)
    // {
    //     User.find()
    //     .then(result=>{
    //         res.status(200).json(result)
    //     })
    //     .catch(err=>{
    //         next(err)
    //     })
    // }

    // static masterDelete(req,res,next)
    // {
    //     User.remove()
    //     .then(result=>{
    //         res.status(200).json(result)
    //     })
    //     .catch(err=>{
    //         next(err)
    //     })
    // }

    static register(req,res,next)
    {
        const { username, email, password } = req.body
        User.create({
            username, email, password
        })
        .then(result=>{
            const registerReturn = { ...result._doc }
            delete registerReturn.password

            res.status(201).json({
                ...registerReturn,
                token : generateToken( result._id )
            })
        })
        .catch(err=>{
            next(err)
        })
    }

    static login(req,res,next)
    {
        const { email, password } = req.body
        if(!email || !password)
            next({ status: 400, message: 'Requirement not satisfied' })
            
        User.findOne({ email })
        .then(result=>{
            if(result)
                {
                    if( verifyHash( password, result.password ) )
                    {
                        const loginReturn = { ...result._doc }
                        delete loginReturn.password

                        res.status(200).json({
                            ...loginReturn,
                            token : generateToken( result._id )
                        })
                    }
                    else
                        throw({ status: 403, message: 'User & password combination is wrong, or User is not Found'})
                }
            else
                throw({ status: 403, message: 'User & password combination is wrong, or User is not Found'})
        })
        .catch(err=>{
            next(err)
        })
    }

}

module.exports = UserController