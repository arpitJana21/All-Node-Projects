// import required modules
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();

const logPath = path.join(__dirname, 'access.log');
const accessLogStream = fs.createWriteStream(logPath, {flags: 'a'});
const logFormat = `:method :status :res[content-length] :response-time ms :date[web] :http-version :url\n`;

app.use(morgan(logFormat, {stream: accessLogStream}));
app.use(express.json());

app.route('/').get(welcome);
app.route('/get-users').get(getUsers);
app.route('/add-user').post(addUser);
app.route('/user/:id').put(updateUser);
app.route('/user/:id').delete(deleteUser);

function welcome(req, res) {
    return res.status(200).json({
        message: 'welcome to server',
    });
}

function getUsers(req, res) {
    return res.status(200).json({
        message: 'here is the list of all users',
    });
}

function addUser(req, res) {
    return res.status(201).json({
        message: 'user added successfully',
    });
}

function updateUser(req, res) {
    const id = req.params.id;
    return res.status(201).json({
        message: `user ${id} updated successfylly`,
    });
}

function deleteUser(req, res) {
    const id = req.params.id;
    return res.status(200).json({
        message: `user ${id} deleted successfylly`,
    });
}

// app.listen(4000);
// // export the server
module.exports = app;
