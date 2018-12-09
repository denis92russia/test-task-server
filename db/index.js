const nconf = require('nconf');
const conf = nconf.get(process.env.NODE_ENV || 'dev')
const mongoose = require('mongoose');
const UrlShorterShema = require('./url-shorter.js');
mongoose.connect(conf.db_uri,{ useNewUrlParser: true })
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});
mongoose.model('urlshorter',UrlShorterShema,'urlshorter');
