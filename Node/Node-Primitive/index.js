const fs = require('fs');

// complete the following fubctions
let filePath = `./test.txt`;

function isNumber(num) {
    if (typeof num === 'number') {
        fs.writeFileSync(filePath, 'it is a Number.');
    } else {
        fs.writeFileSync(filePath, 'it is Not a Number.');
        return 'it is Not a Number.'
    }
}

function isStr(str) {
    if (isNaN(Number(str))) {
        fs.writeFileSync(filePath, 'it is a String.');
    } else {
        fs.writeFileSync(filePath, 'it is Not a String.');
    }
}

function isArray(arr) {
    if(Array.isArray(arr)){
        fs.writeFileSync(filePath, 'it is a Array.');
    }else{
        fs.writeFileSync(filePath, 'it is Not a Array.');
    }
}

function isObj(obj) {
    if(!Array.isArray(obj) && typeof obj === 'object'){
        fs.writeFileSync(filePath, 'this is a object.');
    }else{
        fs.writeFileSync(filePath, 'this is not a object.')
    }
}

function cls() {
    fs.unlinkSync(filePath)
}

// Export All the functions
module.exports = {isNumber, isStr, isArray, isObj, cls}
