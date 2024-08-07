const Sequelize = require('sequelize');
require('dotenv').config();
let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Important for Heroku SSL
      }
    },
    logging: false // Optional: Disable logging if not needed
  });;
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      port: process.env.DB_PORT,
    },
  );
}
module.exports = sequelize;

