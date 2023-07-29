const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('db_sql_tutorial', 'root', '@rpitj@n@21SR!', {
    host: 3306,
    dialect: 'mysql',
});

module.exports = {sequelize};
