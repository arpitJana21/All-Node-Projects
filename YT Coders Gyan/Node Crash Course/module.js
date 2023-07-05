// NPM Modules
const color = require('cli-color');

// LOCAL Modules
const {register, login} = require('./auth.js');

// BUILT-IN Modules
const path = require('path');

console.log(color.green('Hello Node Js'));
console.log(color.red('Hello Node Js'));
console.log(color.yellow('Hello Node Js'));

register('Arpit Jana');
login('Sourav Jana');

console.log('__dirname: ' + __dirname);
console.log('__filename: ' + __filename);

console.log(path.join('Users', 'Routes', 'auth.js'));
