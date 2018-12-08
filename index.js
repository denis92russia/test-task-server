require('./db');
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const request = require('request');
const bodyParser = require('body-parser');
const randomstring = require("randomstring");
const UrlShorterModel = mongoose.model('urlshorter')
var corsOptions = {
    origin: 'http://127.0.0.1:4200',
    optionsSuccessStatus: 200
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors(corsOptions));
app.get('/checkUrl/', async function (req, res, next) {
    try {
        console.log(req.query.url)
        if (!req.query.url) {
            return res.status(400).send({ message: 'url is required' });
        }
        const { status } = await axios({ url: req.query.url }).catch(e => {
            console.log(e)
            return { status: 404 }
        });

        res.status(200).send({ success: status === 200 ? true : false });
    }
    catch (e) {
        console.error(e)
        res.sendStatus(500);
    }

})
app.get('/get-all-dock', async function (req, res, next) { 
    try{
        const docs = await UrlShorterModel.find({}).lean();
        console.log(docs)
        res.status(200).send({message:'see doc in console'});
    }
    catch(e){
        console.error(e)
        res.sendStatus(500);
    }
})
app.post('/saveUrl', async function (req, res, next) {
    try {
        console.log(req.body)
        if(!req.body || !req.body.originUrl){
            return res.sendStatus(400);
        }

        let randomLenth = Math.random() + Math.random()*2 + Math.random()*4;
        randomLenth = randomLenth >4 ? randomLenth: 8-randomLenth;
        let shortUrl =null;
        let length;
        while( shortUrl==null || length) {
            shortUrl = randomstring.generate(randomLenth)
            length = (await UrlShorterModel.find({shortUrl:shortUrl})).length;
        }
        console.log('11111')
        await UrlShorterModel.create({
            originUrl:req.body.originUrl,
            shortUrl:shortUrl
        }).catch((e)=>{
            console.log(e)
        })
        res.send({shortUrl:shortUrl});
    }
    catch (e) {
        console.error(e)
        res.sendStatus(500);
    }
})

app.listen(4000);