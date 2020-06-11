const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    joineddate:{
        type: Date,
        default: Date.now
    }
})

module.exports = user = mongoose.model('user',userschema)