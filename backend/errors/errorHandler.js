const { STATUS_SERVER_ERROR } = require('./constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || STATUS_SERVER_ERROR;
  const message = statusCode === STATUS_SERVER_ERROR ? 'Произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = { errorHandler };
