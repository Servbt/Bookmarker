import express from 'express';
import bodyParser from 'body-parser';
import mainController from './controllers/mainController.js';
// import session from 'express-session';
import sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// import sequelize  from './config/connection.js';
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const port = 3000;


const sequelizes = new sequelize('bookmarker', 'postgres', 'C@rrib3an!', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

try {
  await sequelizes.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


// const sess = {
//   secret: 'Super secret secret',
//   cookie: {
//     // 15 minutes
//     maxAge: 900000,
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

app.set('trust proxy', 1);
// app.use(session(sess));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', mainController);


app.listen(port, () => console.log('Now listening'));
