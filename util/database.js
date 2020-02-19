const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodecomplete','root','aboulmagdApps',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;