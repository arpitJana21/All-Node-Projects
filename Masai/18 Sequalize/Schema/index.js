const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('db_sql_tutorial', 'root', '@rpitj@n@21SR!', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = {sequelize};
