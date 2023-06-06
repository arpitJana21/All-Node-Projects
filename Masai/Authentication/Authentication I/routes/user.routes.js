const express = require('express');
const {UserModel} = require('../model/users.model.js');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {blackList} = require('../blacklist.js');
const {auth} = require('../middleware/auth.middleware.js');

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

                    const token = jwt.sign({foo: 'bar'}, 'masai', {
                        expiresIn: '7d',
                    });

                    const rToken = jwt.sign({foo: 'bar'}, 'masairT', {
                        expiresIn: '28d',
                    });

                    return res.status(200).json({
                        status: 'success',
                        message: 'Login Successful !',
                        token: token,
                        rToken: rToken,
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

userRouter.get('/logout', auth, function (req, res) {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if (!token) throw new Error('Token not found');
        blackList.push(token);
        res.status(200).json({
            status: 'success',
            message: 'logout successful',
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            error: err.message,
        });
    }
});

userRouter.get('/refreshToken', function(req, res){
    const rToken = req.headers.authorization?.split(' ')[1];
    jwt.verify(rToken, 'masairT', function(err, decoded){
        if(decoded){
            const token = jwt.sign({foo: 'bar'}, 'masai', {
                expiresIn: '7d',
            });
            res.status(200).json({
                status: 'success',
                token: token
            })
        }else{
            res.status(400).json({
                status: 'fail',
                message: 'Invalid Refresh Token'
            })
        }
    })
})

module.exports = {userRouter};
