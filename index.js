const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const request = require('request');
var corsOptions = {
    origin: 'http://127.0.0.1:4200',
    optionsSuccessStatus: 200
}


app.use(cors(corsOptions));
app.get('/checkUrl/:url', async function (req, res, next) {
    try {
        if (!req.params.url) {
            return res.status(400).send({ message: 'url is required' });
        }
        const { status } = await axios({ url: 'http://' + req.params.url }).catch(e => {
            return { status: 404 }
        });

        res.status(200).send({ success: status === 200 ? true : false });
    }
    catch (e) {
        console.log(e)
        res.sendStatus(500);
    }

})

app.listen(4000);