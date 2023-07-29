const {DataTypes} = require('sequelize');
const {sequelize} = require('../db.js');
const {Batch} = require('./batch.js');

const Student = sequelize.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    batchID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Batch',
            key: 'id',
        },
    },
});

Batch.hasMany(Student, {foreignKey: 'batchID'});
Student.belongsTo(Batch, {foreignKey: 'batchID'});

module.exports = {Student};
