// index.js

//  import the crypto module
const crypto = require('crypto');
const process = require('process');

let [operation, x, y] = process.argv.slice(2);
x = +x;
y = +y;

// complete the  function

switch (operation) {
   case 'add':
      console.log(x + y);
      break;
   case 'sub':
      console.log(x - y);
      break;
   case 'mult':
      console.log(x * y);
      break;
   case 'divide':
      console.log(x / y);
      break;
   case 'sin':
      console.log(Math.sin(x));
      break;
   case 'cos':
      console.log(Math.cos(x));
      break;
    case 'tan':
      console.log(Math.tan(x));
      break;
    case 'random':
      if(!x){
        console.log('Provide length for random number generation.')
      }else{
        console.log(crypto.randomBytes(x).toString('binary'))
      }
      break;
   default:
      console.log('Invalid operation');
}
