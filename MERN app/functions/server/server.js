const express = require('express')
const mongoose = require('mongoose')
//const bodyparser = require('body-parser')
const items = require('./controller/itemroute')
const config1 =  require('config')
const uri = config1.get('mernapp.mongouri') 
const cors = require('cors')
const path = require('path')


const schema = require('./models/item');
const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/items',items)
app.use('/api/users',require('./controller/userroute'))
app.use('/api/auth',require('./controller/auth'))


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('../client/dist'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'../client/dist/index.html'));
      });
}

mongoose.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true },(err)=>{
    if(err){console.log(err);}
    else{console.log("Connection to Mongodb DB successful");}
});


// const port = process.env.PORT || 4000

// app.listen(port,(err)=>{
//     console.log("Server started on 4000")
// })

module.exports = app