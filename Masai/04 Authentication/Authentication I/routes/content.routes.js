const express = require('express');
const contentRouter = express.Router();
const jwt = require('jsonwebtoken');
const {auth} = require('../middleware/auth.middleware.js');

contentRouter.get('/about', function (req, res) {
    return res.status(200).json({
        status: 'success',
        message: 'This is the content about page',
    });
});

contentRouter.get('/movies', auth, function (req, res) {
    return res.status(200).json({
        status: 'success',
        message: 'This is your movie',
    });
});

contentRouter.get('/series', auth, function (req, res) {
    return res.status(200).json({
        status: 'success',
        message: 'This is your Series',
    });
});

module.exports = {contentRouter};
