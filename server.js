import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import mainController from './controllers/mainController.js';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'bookmarker',
  password: 'C@rrib3an!',
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', mainController);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
