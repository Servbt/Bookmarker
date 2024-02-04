const Sequelize = require('sequelize');

const sequelize = new Sequelize('bookmarker', 'postgres', 'C@rrib3an!', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

module.exports = sequelize;
