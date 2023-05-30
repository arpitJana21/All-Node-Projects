const express = require('express');
const {UserModel} = require('../model/users.model.js');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRouter.get('/', function (req, res) {
    return res.status(200).json({status: 'success', message: 'Welcome'});
});

userRouter.post('/register', async function (req, res) {
    try {
        bcrypt.hash(req.body.pass, 5, async function (err, hash) {
            if (err) {
                return res
                    .status(400)
                    .json({status: 'fail', message: err.message});
            } else {
                req.body.pass = hash;
                const user = new UserModel(req.body);
                await user.save();
            }
        });
        return res.status(200).json({
            status: 'success',
            message: 'New User Added',
            user: req.body,
        });
    } catch (error) {
        return res.status(400).json({status: 'fail', message: error.message});
    }
});


// Authentication
userRouter.post('/login', async function (req, res) {
    const {email, pass} = req.body;
    
    try {
        const user = await UserModel.findOne({email});

        if (user) {
            bcrypt.compare(pass, user.pass, function (err, result) {
                if (result) {
                    const token = jwt.sign({ foo: 'bar' }, 'masai');
                    return res.status(200).json({
                        status: 'success',
                        message: 'Login Successful !',
                        token: token
                    });
                } else {
                    return res
                        .status(200)
                        .json({status: 'fail', message: 'Wrong Password !'});
                }
            });
        } else {
            return res
                .status(200)
                .json({status: 'fail', message: 'User Not found !'});
        }
    } catch (err) {
        return res.status(400).json({status: 'fail', message: err.message});
    }
});

module.exports = {userRouter};
