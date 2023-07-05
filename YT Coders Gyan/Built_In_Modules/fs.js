const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, '/test'), function (err) {
    if (err) {
        console.log('Something went wrong');
        return;
    }
    console.log('Folder created !');
});

fs.writeFile(
    path.join(__dirname, 'test', 'test.txt'),
    'Hello Node',
    function (error) {
        if (err) {
            throw err;
        }
        console.log('File Created...');
    }
);

fs.appendFile(
    path.join(__dirname, 'test', 'test.txt'),
    'Hello World',
    function (err) {
        if (err) {
            throw err;
        }
        console.log('\nData Added');
    }
);

fs.readFile(path.join(__dirname, 'test', 'test.txt'), 'utf-8', function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data);
});



