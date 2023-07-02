const {BlacklistModel} = require('../model/backList.model');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const auth = async function(req, res, next){
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const exist = await BlacklistModel.findOne({token});

        if (!token) throw new Error('Provide the token Please');
        if (exist) throw new Error('Please Login !');
    
        jwt.verify(token, process.env.secretKey, function(err, decoded){
            if(err){
                return res.status(400).json({
                    status: 'fail',
                    error: err.message
                })
            }
    
            if(decoded){
                req.body.userID = decoded.userID;
                next();
            }
        })
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        })
    }
}

module.exports = {auth};