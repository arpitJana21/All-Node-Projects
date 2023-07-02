//  import required modules from nodejs and build the server
const fs = require('fs');
const express = require('express');
const validator = require('./middlewares/validator.js')
const server = express();

// Middle Wares
server.use(express.json());
server.use(validator);


server.route('/').post(function (req, res) {
    return res.status(200).send('data received');
});



server.listen(4000);

// export the server
module.exports = server;