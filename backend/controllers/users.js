const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ErrorNotFound } = require('../errors/ErrorNotFound');
const { ErrorBadRequest } = require('../errors/ErrorBadRequest');
const { ErrorEmailDublicate } = require('../errors/ErrorEmailDublicate');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new ErrorNotFound('Пользователь не найден'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new ErrorBadRequest('Ошибка данных в запросе: некорректный Id'));
      } else {
        next(e);
      }
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new ErrorNotFound('Пользователь не найден'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new ErrorBadRequest('Ошибка данных в запросе: некорректный Id'));
      } else {
        next(e);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hashedPassword,
      })
        .then((user) => {
          const createdUser = {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          };
          res.send({ data: createdUser });
        })
        .catch((e) => {
          if (e.code === 11000) {
            next(new ErrorEmailDublicate('Ошибка данных в запросе: пользователь с таким email существует'));
          } else if (e.name === 'ValidationError') {
            next(new ErrorBadRequest('Ошибка данных в запросе'));
          } else {
            next(e);
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'PRODUCTION' ? JWT_SECRET : 'SECRET',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  console.log(userId);
  console.log(req.body);
  User.findByIdAndUpdate(userId, { name, about }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => new ErrorNotFound('Пользователь не найден'))
    .then((user) => {
      console.log(user);
      res.send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new ErrorBadRequest('Ошибка данных в запросе'));
      } else {
        next(e);
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => new ErrorNotFound('Пользователь не найден'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new ErrorBadRequest('Ошибка данных в запросе'));
      } else {
        next(e);
      }
    });
};

module.exports = {
  createUser,
  login,
  getUsers,
  getCurrentUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
};
