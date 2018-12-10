const nconf = require('nconf');
nconf.argv().env().file({ file: './conf.json' });
const conf = nconf.get(process.env.NODE_ENV || 'dev')
require('./db');
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const appRoutes = require('./routes/app');
const redirectRoutes = require('./routes/redirect');


var corsOptions = {
    origin:  conf.origin,
    optionsSuccessStatus: 200
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/chec', function(req,res,next){
    res.send({message:'ok'})
})
app.use(cors(corsOptions));


app.use('/app',appRoutes);
app.use(redirectRoutes);

app.listen(4000);