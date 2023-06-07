const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserModel} = require('../model/user.model.js');
const userRouter = express.Router();

userRouter.post('/register', registerLogic);
userRouter.post('/login', loginLogic);
userRouter.get('/refreshToken', refreshTokenLogic);

async function registerLogic(req, res) {
    try {
        const {name, email, pass} = req.body;
        bcrypt.hash(pass, 5, function (err, hash) {
            if (!err) {
                const newUser = new UserModel({name, email, pass: hash});
                newUser.save();

                return res.status(200).json({
                    status: 'ok',
                    message: 'A new user registered',
                    user: req.body,
                });
            } else {
                return res.status(400).json({
                    status: 'fial',
                    error: err.message,
                });
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            error: err.message,
        });
    }
}
async function loginLogic(req, res) {
    try {
        const {email, pass} = req.body;
        const user = await UserModel.findOne({email});
        if (!user) throw new Error('User not Found');
        bcrypt.compare(pass, user.pass, function (err, result) {
            if (err) {
                return res.status(400).json({
                    status: 'fail',
                    error: err.message,
                });
            }

            if (result) {
                const aToken = jwt.sign({data: 'foobar'}, 'masaiA', {
                    expiresIn: '1h',
                });
                const rToken = jwt.sign({data: 'foobar'}, 'masaiR', {
                    expiresIn: '28h',
                });
                return res.status(200).json({
                    status: 'ok',
                    message: 'Login Successfull',
                    accessToken: aToken,
                    refreshToken: rToken,
                });
            }

            if (!result) {
                return res.status(200).json({
                    status: 'fail',
                    Error: 'Wrong Password',
                });
            }
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
}
async function refreshTokenLogic(req, res) {
    const rToken = req.headers.arthorization?.split(' ')[1];
    jwt.verify(rToken, 'masaiR', function (err, decoded) {
        if (err) {
            return res.status(400).json({
                status: 'fail',
                error: err.message,
            });
        }
        if (decoded) {
            const aToken = jwt.sign({data: 'foobar'}, 'masaiA', {
                expiresIn: '1h',
            });
            const rToken = jwt.sign({data: 'foobar'}, 'masaiR', {
                expiresIn: '28h',
            });
            return res.status(200).json({
                status: 'ok',
                accessToken: aToken,
                refreshToken: rToken,
            });
        }
    });
}

module.exports = {userRouter};
