const jwt = require('jsonwebtoken');
const {blackListModel} = require('../model/blacklist.model');
const auth = async function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    const exist = await blackListModel.findOne({token});
    try {
        if (!token) throw new Error('Provide the token Please');
        if (exist) throw new Error('Please Login !');
        jwt.verify(token, 'masaiA', function (err, decoded) {
            if (err) {
                return res.status(400).json({
                    status: 'fail',
                    error: err.message,
                });
            }

            if (decoded) {
                req.body.userID = decoded.userID;
                req.body.userName = decoded.userName;
                next();
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
