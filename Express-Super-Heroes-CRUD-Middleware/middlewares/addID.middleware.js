const fs = require('fs');
const addID = function (req, res, next) {
    const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    const id = data.heroes.length + 1;
    req.body['id'] = id;
    next();
};

module.exports = {
    addID,
};
