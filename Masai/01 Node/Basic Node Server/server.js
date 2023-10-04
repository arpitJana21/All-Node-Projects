const http = require('http');

const server = http.createServer(function (req, res) {

    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/') {
        res.statusCode = 200;
        res.end(
            JSON.stringify({
                status: 'Success',
                message: 'Wellcome to the Node Server',
            })
        );
    }

    if (req.url === '/endpt01') {
        if (req.method === 'GET') {
            res.statusCode = 200;
            res.end(
                JSON.stringify({
                    status: 'Success',
                    message: 'This is Endpoint 01',
                })
            );
        }

        if (req.method === 'POST') {
            let reqBody = '';

            req.on('data', function (chunk) {
                reqBody += chunk;
            });

            req.on('end', function () {
                console.log(JSON.parse(reqBody));
                res.statusCode = 200;
                res.end(
                    JSON.stringify({
                        status: 'Success',
                        message: 'Data posted Successfully',
                    })
                );
            });
        }
    }

    if (req.url === '/endpt02') {
        res.statusCode = 200;
        res.end({
            status: 'Success',
            message: 'This is Endpoint 02',
        });
    }
});

server.listen(5000, function () {
    console.log('URL : http://127.0.0.1:5000/');
});
