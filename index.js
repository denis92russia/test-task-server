const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
var corsOptions = {
    origin: 'http://127.0.0.1:4200',
    optionsSuccessStatus: 200
  }
  
  
app.use(cors(corsOptions));
app.get('/checkUrl/:url', async function(req,res,next){
    try{
        if(!req.params.url){
            return res.status(400).send({message:'url is required'});
        }
        const {status} = await axios({url:'http://'+req.params.url});
        res.status(200).send({success: true});
    }
    catch(e){
        res.sendStatus(500);
    }

})

app.listen(4000);