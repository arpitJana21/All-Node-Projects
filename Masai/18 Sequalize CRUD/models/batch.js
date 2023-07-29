const {DataTypes} = require('sequelize');
const {sequelize} = require('../db.js');

const Batch = sequelize.define('Batch', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = {Batch};
