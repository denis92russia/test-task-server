const routes = require('express').Router();
const axios = require('axios');
const mongoose = require('mongoose')
const UrlShorterModel = mongoose.model('urlshorter');

routes.get('/checkUrl/', async function (req, res, next) {
    try {
        if (!req.query.url) {
            return res.status(400).send({ message: 'url is required' });
        }
        const { status } = await axios({ url: req.query.url }).catch(e => {
            return { status: 404 }
        });

        res.status(200).send({ success: status === 200 ? true : false });
    }
    catch (e) {
        console.error(e)
        res.sendStatus(500);
    }

})
routes.get('/get-all-dock', async function (req, res, next) {
    try {
        const docs = await UrlShorterModel.find({}).lean();
        res.status(200).send({ message: 'see doc in console' });
    }
    catch (e) {
        console.error(e)
        res.sendStatus(500);
    }
})
routes.post('/saveUrl', async function (req, res, next) {
    try {
        if (!req.body || !req.body.originUrl) {
            return res.sendStatus(400);
        }

        let randomLenth = Math.random() + Math.random() * 2 + Math.random() * 4;
        randomLenth = randomLenth > 4 ? randomLenth : 8 - randomLenth;
        let shortUrl = null;
        let length;
        while (shortUrl == null || length) {
            shortUrl = randomstring.generate(randomLenth)
            length = (await UrlShorterModel.find({ shortUrl: shortUrl })).length;
        }
        await UrlShorterModel.create({
            originUrl: req.body.originUrl,
            shortUrl: shortUrl
        });
        res.send({ shortUrl: shortUrl });
    }
    catch (e) {
        console.error(e)
        res.sendStatus(500);
    }
})
routes.get('/check-short', async function (req, res, next) {
    try{
        const {length} = await UrlShorterModel.find({ shortUrl: req.query.url });
        if(length>0){
            return res.status(200).send({success: false});
        }
        res.status(200).send({success: true })
    }   
    catch (e) {
        console.error(e)
        res.sendStatus(500);
    }
})
routes.put('/update-short', async function(req,res,next){
    try{
        if(!req.body.originUrl || !req.body.shortUrl){
            res.sendStatus(400);
        }
        const doc = await UrlShorterModel.findOneAndUpdate({originUrl:req.body.originUrl},{$set:{shortUrl:req.body.shortUrl}});
        res.status(200).send({success:true});

    } 
    catch(e){
        res.sendStatus(500);
    }
})
module.exports = routes;