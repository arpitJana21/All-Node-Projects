const express = require('express');
const {UserModel} = require('../Model/users.model.js');
const {blackListModel} = require('../Model/blackList.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

userRouter.get('/', async function (req, res) {
    try {
        const users = await UserModel.find(req.query);
        return res.status(200).json({
            status: 'ok',
            users: users,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
});

userRouter.post('/register', async function (req, res) {
    try {
        bcrypt.hash(req.body.pass, 5, async function (err, hash) {
            if (!err) {
                req.body.pass = hash;
                const user = new UserModel(req.body);
                user.save();
                return res.status(200).json({
                    status: 'ok',
                    message: 'A new user has been added',
                    user: req.body,
                });
            } else {
                return res.status(400).json({
                    status: 'fail',
                    error: err.message,
                });
            }
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
});

userRouter.post('/login', async function (req, res) {
    const {email, pass} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if (user) {
            bcrypt.compare(pass, user.pass, function (err, result) {
                if (result) {
                    const token = jwt.sign({foo: 'bar'}, 'masai', {
                        expiresIn: '7d',
                    });
                    const rToken = jwt.sign({foo: 'bar'}, 'masaiRT', {
                        expiresIn: '28d',
                    });
                    return res.status(200).json({
                        status: 'ok',
                        message: 'Login Successfull',
                        token: token,
                        rToken: rToken,
                    });
                }
                if (err) {
                    return res.status(400).json({
                        status: 'fail',
                        error: 'Wrong Password',
                    });
                }
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'User Not Found !',
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
});

userRouter.get('/logout', async function (req, res) {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if (!token) throw new Error('Token not found !');
        const newToken = await new blackListModel({token});
        newToken.save();
        return res.status(200).json({
            status: 'ok',
            message: 'Logout Successfull',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
});

userRouter.get('/refreshToken', async function (req, res) {
    const rToken = req.headers.authorization?.split(' ')[1];

    try {
        if (!rToken) throw new Error('Invalid Refresh Token');
        jwt.verify(rToken, 'masaiRT', function (err, decoded) {
            if (decoded) {
                const token = jwt.sign({foo: 'bar'}, 'masai', {
                    expiresIn: '7d',
                });
                return res.status(200).json({
                    status: 'ok',
                    token: token,
                });
            }
            if (err) {
                return res.status(400).json({
                    status: 'ok',
                    error: err.message,
                });
            }
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
});

module.exports = {userRouter};
