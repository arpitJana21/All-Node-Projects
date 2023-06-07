const express = require('express');
const {auth} = require('../Middleware/auth.middleware.js');

const blogRouter = express.Router();

blogRouter.get('/', auth, function (req, res) {
    return res.status(200).json({
        status: 'ok',
        blogs: 'blogs',
    });
});

module.exports = {blogRouter};
