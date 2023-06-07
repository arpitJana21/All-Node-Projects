const jwt = require('jsonwebtoken')
const auth = async function(req, res, next){
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if(!token) throw new Error('Provide the token Please');
    jwt.verify(token, 'masaiA', function(err, decoded) {
        if(err){
            return res.status(400).json({
                status: 'fail',
                error: err.message
            })
        }

        if(decoded){
            next();
        }
      });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message
        })
    } 
}

module.exports = {auth};