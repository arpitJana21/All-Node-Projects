const express = require('express');
const {UserModel, connection} = require('./db.js');

const app = express();
app.use(express.json());

app.get('/users', async function (req, res) {
    const users = await UserModel.find();
    res.send(users);
});

app.get('/users/:userID', async function (req, res) {
    const {userID} = req.params;
    const user = await UserModel.findOne({id: userID});
    res.send(user);
});

app.post('/users/add', async function (req, res) {
    const user = new UserModel(req.body);
    await user.save();
    res.send(user);
});

app.patch('/users/update/:userID', async function (req, res) {
    const {userID} = req.params;
    await UserModel.updateOne({id: userID}, req.body);
    const user = await UserModel.findOne({id: userID});
    res.send(user);
});

app.delete('/users/delete/:userID', async function (req, res) {
    const {userID} = req.params;
    await UserModel.deleteOne({id: userID});
    const users = await UserModel.find();
    res.send(users);
});

const server = app.listen(8080, async function () {
    try {
        console.log('Connecting...');
        await connection;
        console.log('Server : http://localhost:8080/');
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = {server};
