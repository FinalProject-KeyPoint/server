const User = require('../model/User')

class UserController{
    static test(req,res)
    {
        res.json({ message: 'User Connected' })
    }

}

module.exports = UserController