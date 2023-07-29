const {sequelize} = require('./index');
const {DataTypes} = require('sequelize');

const Post = sequelize.define('posts', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    },
});

module.exports = {Post};
