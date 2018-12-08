const mongoose = require('mongoose');
const UrlShorterShema = require('./url-shorter.js')
// mongoose.connect('mongodb://admin:kW$2WEO7;}=MJg@95.163.213.166/MongoDB-5095',{ useNewUrlParser: true });
mongoose.connect('mongodb://denis:dsadsa111@ds125574.mlab.com:25574/test-project',{ useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});
mongoose.model('urlshorter',UrlShorterShema,'urlshorter');
