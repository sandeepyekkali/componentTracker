const functions = require('firebase-functions');

const app1 = require('server')

const express= require('express')

const app = express()

app.use('/api/items',(req,res)=>{
    res.send('Test!!!')})


functions.config()

exports.app = functions.https.onRequest(app1);
