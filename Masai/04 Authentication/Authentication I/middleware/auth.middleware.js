const jwt = require('jsonwebtoken');
const {blackList} = require('../blacklist.js');

const auth = function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token && !blackList.includes(token)) {
        jwt.verify(token, 'masai', function (err, decoded) {
            if (err) {
                return res.status(200).json({
                    status: 'fail',
                    error: err.message,
                });
            } else {
                next();
            }
        });
    } else {
        return res.status(200).json({
            status: 'fail',
            error: 'Please Login !',
        });
    }
};

module.exports = {auth};
