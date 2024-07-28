const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./controllers/index.js');
const session = require('express-session');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');

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
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.set('trust proxy', 1);
app.use(session(sess));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => console.log('Now listening'));
});
