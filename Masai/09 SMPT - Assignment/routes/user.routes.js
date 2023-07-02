const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserModel} = require('../model/user.model.js');
const {blackListModel} = require('../model/blacklist.model.js');
const userRouter = express.Router();
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
require('dotenv').config();

userRouter.post('/register', registerLogic);
userRouter.post('/login', loginLogic);
userRouter.get('/logout', logoutLogic);
userRouter.post('/verifyOTP', OTPverificationLogic);
userRouter.post('/getOTP', getOTPlogic);
userRouter.post('/forgetPassword', forgetPasswordLogic);

async function registerLogic(req, res) {
    try {
        const {name, email, pass} = req.body;
        const otp = otpGenerator.generate(6);
        bcrypt.hash(pass, 5, async function (err, hash) {
            if (!err) {
                const newUser = new UserModel({name, email, pass: hash, otp});
                await newUser.save();

                // Send Email OTP
                let transporter = nodemailer.createTestAccount({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD,
                    },
                });

                await transporter.sendEmail({
                    to: email,
                    from: process.env.EMAIL,
                    subject: 'OTP',
                    text: message,
                });

                return res.status(200).json({
                    status: 'ok',
                    message:
                        'A new user registered, Verification OTP has been Sent',
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

async function OTPverificationLogic(req, res) {
    try {
        const {email, otp} = req.body;
        const user = UserModel.findOne({email});
        if (!user) throw new Error('Wrong Email');
        if (otp !== user.otp) throw new Error('Otp Not Matching');
        user.verified = true;
        await user.save();

        return res.status(200).json({
            status: 'ok',
            message: 'User Verified',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: err.message,
        });
    }
}

async function getOTPlogic(req, res) {
    try {
        const {email} = req.body;
        const user = UserModel.findOne({email});
        if (!user) throw new Error('Wrong Email');
        const otp = otpGenerator.generate(6);
        user.otp = otp;
        await user.save();

        let transporter = nodemailer.createTestAccount({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        await transporter.sendEmail({
            to: email,
            from: process.env.EMAIL,
            subject: 'OTP',
            text: message,
        });

        return res.status(200).json({
            status: 'ok',
            message: 'OTP sent on Email',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: err.message,
        });
    }
}

async function forgetPasswordLogic(req, res) {
    try {
        const {email, otp, newPassword} = req.body;
        const user = UserModel.findOne({email});
        if (!user) throw new Error('User Not found');
        if (user.otp !== otp) throw new Error('Invalid OTP');

        bcrypt.hash(newPassword, 5, async function (err, hash) {
            if (err) throw err;
            user.pass = hash;
            await user.save();
            return res.status(200).json({
                status: 'ok',
                message: 'Password Updated Successfully',
                user: req.body,
            });
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fial',
            error: err.message,
        });
    }
}

async function loginLogic(req, res) {
    try {
        const {email, pass} = req.body;
        const user = await UserModel.findOne({email});
        if (!user) throw new Error('User not Found');
        if (!user.verified) throw new Error('User not Verified');
        bcrypt.compare(pass, user.pass, function (err, result) {
            if (err) {
                return res.status(400).json({
                    status: 'fail',
                    error: err.message,
                });
            }

            if (result) {
                const aToken = jwt.sign(
                    {userID: user._id, userName: user.name},
                    'masaiA',
                    {
                        expiresIn: '1h',
                    }
                );
                return res.status(200).json({
                    status: 'ok',
                    message: 'Login Successfull',
                    accessToken: aToken,
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

async function logoutLogic(req, res) {
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
}

module.exports = {userRouter};
