const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

const route = express.Router();

const userschema = require('../models/usermodel')

//Get for /api/users

route.post('/',(req,res)=>{
    const {name,email,password} = req.body
    

    if(!name || !email ||!password){
        return res.status(400).json({msg:"Error connecting-Enter all fields"})
    }
    //Check existing
    userschema.findOne({email})
    .then(user=>{if(user) return res.json({msg:'already exists'})})

    const userschema1 = new userschema({
        name,email,password
    })


    //create salt and hash
    bcrypt.genSalt(0,(err,salt)=>{
        bcrypt.hash(userschema1.password,salt,(err,hash)=>{
            userschema1.password=hash;
            userschema1.save()
            .then((user)=>{

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
    })
});


module.exports = route;