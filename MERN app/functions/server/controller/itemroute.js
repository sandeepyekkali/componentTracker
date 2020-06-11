const express = require('express')
const mongoose = require('mongoose')
const auth = require('../middleware/auth')


const route = express.Router();

const itemschema = require('../models/item')

//Get for /api/items

route.get('/',(req,res)=>{
    itemschema.find()
    .sort({date: -1})
    .then((docs)=> res.json(docs))
});


route.post('/',auth, (req,res)=>{
    const itemschema1 = new itemschema({
        name : req.body.name
    })

    
    itemschema1.save().then((item)=>res.json(item)).catch((err)=>{console.log(err)})

})

route.delete('/:id',auth,(req,res)=>{
    itemschema.findByIdAndRemove(req.params.id).then(()=>res.send('Item removed'))
    .catch((err)=>res.send('error removing'))
})

module.exports = route;