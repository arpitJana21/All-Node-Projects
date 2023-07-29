const {sequelize} = require('./index');
const {DataTypes} = require('sequelize');

const User = sequelize.define('users', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    age: DataTypes.INTEGER,
    phone: DataTypes.STRING(10),
});

module.exports = {User};
