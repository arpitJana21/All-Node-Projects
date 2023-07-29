const express = require('express');
const {sequelize} = require('./Schema/index.js');
const {User} = require('./Schema/users.js');
const {Post} = require('./Schema/posts.js');

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

app.post('/posts', async (req, res) => {
    const data = await Post.create({
        ...req.body,
    });
    res.status(200).json({
        isError: false,
        data,
    });
});

app.get('/posts', async (req, res) => {
    User.hasMany(Post, {foreignKey: 'userID'});
    Post.belongsTo(User, {foreignKey: 'userID'});
    const data = await Post.findAll({
        include: [User],
    });
    res.status(200).json({
        isError: false,
        data,
    });
});

sequelize.sync().then(function () {
    app.listen(3001, function () {
        console.log('Server is running on port : 3001');
    });
});
