const nconf = require('nconf');
const routes = require('express').Router();
const mongoose = require('mongoose')
const UrlShorterModel = mongoose.model('urlshorter');
const conf = nconf.get(process.env.NODE_ENV || 'dev');
routes.get('/:short', async function(req,res,next){
    try{
        if(!req.params.short){
            return res.redirect(conf.origin)
        }
        const doc = await UrlShorterModel.findOne({shortUrl:req.params.short});
        if(!doc || !doc.originUrl){
            return res.redirect(conf.origin)
        }
        res.redirect(doc.originUrl)
    }
    catch(e){
        res.sendStatus(500);
    }
})
routes.get(function(req,res,next){
    res.redirect(conf.origin)
})
module.exports = routes;