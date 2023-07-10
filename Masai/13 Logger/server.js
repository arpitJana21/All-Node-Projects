const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-mongodb');

const app = express();

app.use(
    expressWinston.logger({
        transports: [
            new winston.transports.Console({
                json: true,
                colorize: true,
                level: 'info',
            }),
            new winston.transports.File({
                json: true,
                colorize: true,
                level: 'info',
            }),
            new winston.transports.MongoDB({
                jons: true,
                db: 'DBURL',
                level: 'info',
            }),
        ],
        format: winston.format.prettyPrint(),
    })
);

app.get('/', function (req, res) {
    res.send('Home Page');
});

app.get('/result', function (req, res) {
    res.send('Results...');
});

app.get('/reports', function (req, res) {
    const {token} = req.query;
    if (token != 123) {
        res.send('Not Authorized !');
    } else {
        res.send('Home Page');
    }
});

app.listen(3000, function () {
    console.log('Server : http://localhost:3000');
});
