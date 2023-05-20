const http = require('http');
const path = require('path');
const fs = require('fs');
const PORT = 7700;


const getDirList = function(url, files){
    return files.map(function(file){
        let filePath = path.join(url, file);
        let stat = fs.statSync(filePath);
        let fileIcon = (stat.isDirectory()) ? '&#128193' : '&#128441';
        return `<li><a href="${filePath}">${fileIcon}${file}</a></li>`
    }).join('');
}


const server = http.createServer(function (request, response) {
    const url = request.url;
    const filePath = path.join('.', url);

    fs.stat(filePath, function (err, stats) {
        if (err) {
            response.writeHead(404, {'content-type': 'text/plain'});
            response.end('404 Not Found');
            return;
        }

        if (stats.isDirectory()) {
            fs.readdir(filePath, function (err, files) {
                if (err) {
                    response.writeHead(404, {'content-type': 'text/plain'});
                    response.end('404 Not Found');
                    return;
                }
                response.writeHead(200, {'content-type': 'text/html'});
                let dirList = getDirList(filePath, files);
                response.end(`<ul>${dirList}</ul>`);
                return;
            });
        }

        if (stats.isFile()) {
            let ext = path.extname(filePath);
            response.writeHead(200, {'content-type' : 'text/plain'});
            let data = fs.readFileSync(filePath);
            response.end(data);
            return;
        }
    });
});

server.listen(PORT);
module.exports = server;
