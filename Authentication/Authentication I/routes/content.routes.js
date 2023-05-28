const express = require('express');
const contentRouter = express.Router();
const jwt = require('jsonwebtoken');

contentRouter.get('/about', function (req, res) {
    try {
        return res.status(200).json({
            status: 'success',
            message: 'This is the content about page',
        });
    } catch (error) {
        return res.status(400).json({status: 'fail', message: error.message});
    }
});

contentRouter.get('/movies', function (req, res) {
    const {token} = req.query;
    try {
        jwt.verify(token, 'masai', function (err, decoded) {
            if (decoded) {
                return res
                    .status(200)
                    .json({status: 'success', message: 'This is your movie'});
            } else {
                return res.status(200).json({
                    status: 'fail',
                    message: err.message,
                });
            }
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
});

contentRouter.get('/series', function (req, res) {
    const {token} = req.query;
    try {
        jwt.verify(token, 'masai', function (err, decoded) {
            if (decoded) {
                return res
                    .status(200)
                    .json({status: 'success', message: 'This is your series'});
            } else {
                return res.status(200).json({
                    status: 'fail',
                    message: err.message,
                });
            }
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
});

module.exports = {contentRouter};
