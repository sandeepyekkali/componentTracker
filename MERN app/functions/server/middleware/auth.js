const config = require('config')
const jwt = require('jsonwebtoken')


//middleware function
function auth(req,res,next){
    const token = req.header('x-auth-token')

    //check token
    if(!token){
       return res.status(401).json({msg:"Unauthorised"})
    }

    try{
    //verify token
    const decoded = jwt.verify(token,config.get('mernapp.jwtsecret'))
    //Add user
    req.user=decoded;
    next();}catch(e){res.status(400).json({msg:'invalid token'})}
}

module.exports = auth