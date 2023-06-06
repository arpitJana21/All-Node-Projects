const fs = require('fs');

fs.readFile('text-file.txt', function () {
    console.log('I/O finished');
    setTimeout(() => console.log('SetTimeOut finished'), 0);
    setTimeout(() => console.log('SetTimeOut finished 3 sec'), 3000);
    setImmediate(() => console.log('setImmediate finished'));
    process.nextTick(() => console.log('Process .nextTick()'));
});

console.log('Hello From the top level Code');
