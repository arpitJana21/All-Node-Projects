const fs = require('fs');

const logger = (req, res, next) => {
  const msg = `URL: ${req.url}, Method: ${req.method}, Timestamp: ${Date()}\n`
  fs.appendFileSync('./logs.txt', msg);
  next();
};

module.exports = {
  logger,
};

//+0.5
