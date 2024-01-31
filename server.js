import express from 'express';
import bodyParser from 'body-parser';
import mainController from './controllers/mainController.js';
import session from 'express-session';
// import dotenv from 'dotenv';
// dotenv.config();

import sequelize from './config/connection.js';
import SequelizeStore from 'connect-session-sequelize';

const SequelizesStore = SequelizeStore(session.Store);

const app = express();
const port = 3000;


const sess = {
  secret: 'Super secret secret',
  cookie: {
    // 15 minutes
    maxAge: 900000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizesStore({
    db: sequelize,
  }),
};

app.set('trust proxy', 1);
app.use(session(sess));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', mainController);


sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => console.log('Now listening'));
});
