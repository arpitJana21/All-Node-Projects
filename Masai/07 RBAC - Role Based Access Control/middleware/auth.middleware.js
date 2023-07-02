const jwt = require('jsonwebtoken');
const {UserModel} = require('../model/user.model.js');
const {blackListModel} = require('../model/blacklist.model.js');
const auth = async function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    const exist = await blackListModel.findOne({token});
    try {
        if (!token) throw new Error('Provide the token Please');
        if (exist) throw new Error('Please Login !');
        jwt.verify(token, 'masaiA', async function (err, decoded) {
            if (err) {
                return res.status(400).json({
                    status: 'fail',
                    error: err.message,
                });
            }

            if (decoded) {
                req.body.userID = decoded.userID;
                req.body.userName = decoded.userName;
                const user = await UserModel.findOne({_id: req.body.userID});
                const role = user?.role;
                req.body.role = role;
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
