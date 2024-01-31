import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
// let sequelizes;


const sequelize = new Sequelize('bookmarker', 'postgres', 'C@rrib3an!', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


export default sequelize;
