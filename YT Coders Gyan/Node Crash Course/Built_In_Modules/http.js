const http = require('http');
const fs = require('fs');
const path = require('path');

const filePathProfile = path.join(__dirname, 'public', 'profile.html');
const filePathAbout = path.join(__dirname, 'public', 'about.html');
const filePathHome = path.join(__dirname, 'public', 'home.html');
const filePathErr = path.join(__dirname, 'public', 'err.html');
const errData = fs.readFileSync(filePathErr);

const app = http.createServer(function (req, res) {
    
    const URL = req.url;

    if (URL == '/') {
        fs.readFile(filePathHome, function (err, data) {
            if (err) showError(res);
            else showData(res, data);
        });
    }

    if (URL == '/profile') {
        fs.readFile(filePathProfile, function (err, data) {
            if (err) showError(res);
            else showData(res, data);
        });
    }

    if (URL == '/about') {
        fs.readFile(filePathAbout, function (err, data) {
            if (err) showError(res);
            else showData(res, data);
        });
    }
});

async function showError(res) {
    res.writeHead(404, {
        'Content-Type': 'text/html',
    });
    return res.end(errData);
}

async function showData(res, data) {
    res.writeHead(404, {
        'Content-Type': 'text/html',
    });
    return res.end(data);
}

const PORT = 4500;

app.listen(PORT, function () {
    console.log(`Listening on http://localhost:${PORT}`);
});
