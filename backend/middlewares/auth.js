const jwt = require('jsonwebtoken');
const { ErrorBadAuth } = require('../errors/ErrorBadAuth');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(auth);
  console.log(authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrorBadAuth('Ошибка аутентификации');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (e) {
    next(new ErrorBadAuth('Ошибка аутентификации'));
  }
  console.log(payload);
  req.user = payload;
  next();
};

module.exports = { auth };
