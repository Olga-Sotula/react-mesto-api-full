require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { auth } = require('./middlewares/auth');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { authRouter } = require('./routes/auth');
const { errorHandler } = require('./errors/errorHandler');
const { ErrorNotFound } = require('./errors/ErrorNotFound');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

app.use(authRouter);
app.use(auth);
app.use(userRouter);
app.use(cardRouter);

app.all('*', (req, res, next) => {
  console.log('appall');
  next(new ErrorNotFound('Указанный маршрут не существует'));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
