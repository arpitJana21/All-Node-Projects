const fs = require('fs');
const path = require('path');
const os = require('os');
const dns = require('dns');
const express = require('express');

const app = express();
app.use(express.json());


const dbFilePath = path.join(__dirname, 'db.json');
const dataJson = fs.readFileSync(dbFilePath);
const data = JSON.parse(dataJson);


app.route('/').get(welcome);
app.route('/add/student').post(addStudent);
app.route('/add/instructor').post(addInstructor);
app.route('/students').get(getStudents);
app.route('/instructors').get(getInstructors);
app.route('/tickets').get(ticketCount);
app.route('/address').get(ipAddress);



// Welcome Function
function welcome(req, res) {
    res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
    res.end(`<h1>Welcome to the Home Page</h1>`);
}

// Add Students
function addStudent(req, res) {
    const newStu = req.body;
    const id = os.userInfo().uid;
    const name = os.userInfo().username;
    newStu.id = id;
    newStu.name = name;
    data.students.push(newStu);
    fs.writeFile(dbFilePath, JSON.stringify(data), function (err) {
        if (err) {
            res.writeHead(404, {'content-type': 'text/plain; charset=utf-8'});
            res.end(JSON.stringify(err));
            return;
        }
        return res.status(200).json(data.students); // express
    });
}

// Add Instructor
function addInstructor(req, res) {
    const newInst = req.body;
    const id = os.userInfo().uid;
    const name = os.userInfo().username;
    newInst.id = id;
    newInst.name = name;
    data.instructors.push(newInst);
    fs.writeFile(dbFilePath, JSON.stringify(data), function (err) {
        if (err) {
            res.writeHead(404, {'content-type': 'text/plain; charset=utf-8'});
            res.end(err);
            return;
        }
        return res.status(200).json(data.instructors);
    });
}

// Get All Students
function getStudents(req, res) {
    return res.status(200).json(data.students);
}

// Get All Instructors
function getInstructors(req, res) {
    return res.status(200).json(data.instructors);
}

// get ticket count
function ticketCount(req, res) {
    let count = 0;
    for (let i = 0; i < data.students.length; i++) {
        count += data.students[i].tickets.length;
    }
    res.writeHead(200, {'content-type': 'text/plain; charset=utf-8'});
    res.end(`Total number of tickets in the system are ${count}`);
}

// IP address
function ipAddress(req, res) {
    dns.lookup('masaischool.com', function (err, address, family) {
        res.writeHead(200, {'content-type': 'text/plain; charset=utf-8'});
        res.end(`URL: masaischool.com IP Address: ${address} Family: IPv${family}`
        );
    });
}

const port = 4000;
app.listen(port, function () {
    console.log(`App running on port ${port}`);
});

// export server
module.exports = app;
