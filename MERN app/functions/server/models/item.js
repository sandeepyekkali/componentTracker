const mongoose = require('mongoose')

const itemschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = item = mongoose.model('item',itemschema)