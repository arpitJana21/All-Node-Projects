const path = require('path');

console.log('DirName : ' + path.dirname('Users/Routes/auth.js'));
console.log('BaseName : ' + path.basename('Users/Routes/auth.js'));
console.log('ExtName : ' + path.extname('Users/Routes/auth.js'));
console.log('Parse : ' + path.parse('Users/Routes/auth.js'));
console.log(path.join('Users', 'Routes', 'auth.js'));