const os = require('os');

console.log('Os Type : ' , os.type());
console.log('Os Platform : ' , os.platform());
console.log('Os CPU details : ', os.cpus());
console.log('Os Free Memory : ', os.freemem());
console.log('Os Total Memory : ', os.totalmem());
console.log('Up time : ', os.uptime());