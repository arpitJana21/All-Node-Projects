const fs = require('fs');

const server = require('http').createServer();

server.on('request', function (req, res) {
    /*
    fs.readFile('input.txt', function (err, data) {
        if (err) {
            console.log(err);
        }
        res.end(data);
    });
    */

    /*
    const readable = fs.createReadStream('inputt.txt');

    readable.on('data', function (chunk) {
        res.write(chunk);
    })

    readable.on('end', function () {
        res.end();
    })

    readable.on('error', function (err) {
        console.log(err)
        res.statusCode = 500;
        res.end('File not Found')
    })
    */

    const readable = fs.createReadStream("input.txt");
    readable.pipe(res);


});

server.listen(5000, function () {
    console.log('URL : http://127.0.0.1:5000');
});
