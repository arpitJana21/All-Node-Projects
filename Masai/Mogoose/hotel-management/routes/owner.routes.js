const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {OwnerModel} = require('../model/owner.model.js');
const {BlacklistModel} = require('../model/backList.model.js');
require('dotenv').config();

const ownerRouter = express.Router();
ownerRouter.post('/signup', signUpLogic);
ownerRouter.post('/login', loginLogic);
ownerRouter.get('/logout', logOutLogic);

async function logOutLogic(req, res) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error('Please provide token');
        const newToken = new BlacklistModel({token});
        await newToken.save();
        return res.status(200).json({
            status: 'success',
            message: 'Logout Successfull',
        });
    } catch (error) {
        return res.staus(400).json({
            staus: 'fail',
            error: error.message,
        });
    }
}

async function loginLogic(req, res) {
    try {
        const payLoad = req.body;
        const user = await OwnerModel.findOne({email: payLoad.email});
        if (!user)
            throw new Error(`User with email: ${payLoad.email}, not found !!`);
        bcrypt.compare(payLoad.password, user.password, function (err, result) {
            if (result) {
                const token = jwt.sign(
                    {userID: user._id},
                    process.env.secretKey,
                    {
                        expiresIn: '7d',
                    }
                );
                return res.status(200).json({
                    status: 'success',
                    message: 'User Login Successfull',
                    token: token,
                });
            }

            if (!result) {
                return res.status(400).json({
                    status: 'fail',
                    error: 'Wrong Password',
                });
            }

            if (err) {
                return res.status(400).json({
                    staus: 'fail',
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
}

async function signUpLogic(req, res) {
    try {
        const payLoad = req.body;
        const existingUser = await OwnerModel.findOne({email: payLoad.email});
        if (existingUser)
            throw new Error('owner already exists with the same email!!');
        bcrypt.hash(req.body.password, 5, async function (err, hash) {
            if (err) {
                return res.status(400).json({
                    status: 'fail',
                    error: err.message,
                });
            } else {
                payLoad.password = hash;
                const newOwner = new OwnerModel(payLoad);
                await newOwner.save();
                return res.status(200).json({
                    status: 'success',
                    message: 'User Successfully Registered',
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

module.exports = {ownerRouter};
