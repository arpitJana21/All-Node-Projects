const jwt = require('jsonwebtoken');
const {blackListModel} = require('../Model/blackList.model.js');
const {json} = require('express');

const auth = async function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    const exist = await blackListModel.findOne({token});
    
    try {
        if (!token) throw new Error('Invalid Token');
        if(exist){
            return res.status(200).json({
                status: 'fail',
                message: 'Please Login'
            })
        }
        jwt.verify(token, 'masai', function (err, decoded) {
            if (decoded) {
                next();
            } else {
                return res.status(200).json({
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
};

module.exports = {auth};
