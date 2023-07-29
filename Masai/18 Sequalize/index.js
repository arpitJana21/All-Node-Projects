const express = require('express');
const {User} = require('./Schema/users.js');
const {sequelize} = require('./Schema/index.js');

const app = express();
app.use(express.json());

app.get('/users', async function (req, res) {
    const data = await User.findAll();
    res.status(200).json({
        isError: false,
        data,
    });
});

app.post('/users', async function (req, res) {
    const {name, address, age, phone} = req.body;

    const data = await User.create({
        name,
        address,
        age,
        phone,
    });

    res.status(200).json({
        isError: false,
        data,
    });
});

app.patch('/users/:id', async function (req, res) {
    const {id} = req.params;
    const payLoad = req.body;
    await User.update({...payLoad}, {where: {id}});
    return res.status(200).json({
        isError: false,
        message: 'User updated successfully',
    });
});

app.delete('/users/:id', async function (req, res) {
    const {id} = req.params;
    await User.destroy({where: {id}});
    return res.status(200).json({
        isError: false,
        message: 'User deleted successfully',
    });
});

sequelize.sync().then(function () {
    app.listen(3001, function () {
        console.log('Server is running on port : 3001');
    });
});
