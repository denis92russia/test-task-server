let mongoose = require('mongoose');
module.exports =  UrlShorterShema = new mongoose.Schema({
    originUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
});

