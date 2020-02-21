const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { generateHash } = require('../helper/bcryptjs')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate:{
            validator: function(v){
                return  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
            },
            message : props => 'Email format is incorrect'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        unique: false
    }
})

userSchema.pre('save', function(){
    this.password = generateHash( this.password )
})


const User = mongoose.model('Users', userSchema)
module.exports = User