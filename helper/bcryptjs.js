const bs = require('bcryptjs')
const salt = bs.genSaltSync(5)

module.exports = {
    generateHash: ( password )=>{
        return bs.hashSync( password, salt )
    },
    verifyHash: ( inputPassword, queryPassword )=>{
        return bs.compareSync( inputPassword, queryPassword )
    }
}