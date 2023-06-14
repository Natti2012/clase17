import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';

import { UserModel } from './DAO/models/users.model.js';
import { usersViewRouter } from './routes/users.view.js';
import { usersRouter } from './routes/users.router.js';
import { __dirname} from './utils.js';
import { connectMongo } from './DAO/db.js';


const app = express();
const port = 3000;
connectMongo();
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.engine('handlebars', handlebars.engine());
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'handlebars');
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/api/users', usersRouter);
  app.use('/users',  usersViewRouter);
