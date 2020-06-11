const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const route = express.Router();

const userschema = require('../models/usermodel')

//Get for /api/auth

route.post('/',(req,res)=>{
    const {email,password} = req.body

    if( !email ||!password){
        return res.status(400).json({msg:"Enter All Fields"})
    }
    //Check existing
    userschema.findOne({email})
    .then(user=>{if(!user) return res.status(401).json({msg:'Invalid user'})


    //Validation
    bcrypt.compare(password, user.password)
    .then(isMatch=>{
        if(!isMatch){return res.status(401).json({msg:"Wrong password"})}

        jwt.sign(
            {id:user.id},
            config.get('mernapp.jwtsecret'),
            {expiresIn: 3600},(err,token)=>{
                res.json({
                    token: token,
                    user:{
                        id: user.id,
                        name:user.name,
                        email:user.email,
                        //password:user.password
                    }
                })
            }
        )

    })


   })
});

//GET to /api/auth/user
route.get('/user',auth,(req,res)=>{
    userschema.findById(req.user.id)
    .select('-password')
    .then((user)=>{res.json(user)})
})


module.exports = route;