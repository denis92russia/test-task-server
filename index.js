const nconf = require('nconf');
nconf.argv().env().file({ file: './conf.json' });
const conf = nconf.get(process.env.NODE_ENV || 'dev')
require('./db');
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const request = require('request');
const bodyParser = require('body-parser');
const randomstring = require("randomstring");
const UrlShorterModel = mongoose.model('urlshorter');

const appRoutes = require('./routes/app');
const redirectRoutes = require('./routes/redirect');


var corsOptions = {
    origin:  conf.origin,
    optionsSuccessStatus: 200
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use(redirectRoutes);
app.use(appRoutes);


app.listen(4000);