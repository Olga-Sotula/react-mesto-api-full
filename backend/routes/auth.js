const express = require('express');

const { createUserValidator, loginValidator } = require('../middlewares/validation');

const authRouter = express.Router();
const {
  createUser,
  login,
} = require('../controllers/users');

authRouter.post('/signup', createUserValidator, createUser);
authRouter.post('/signin', loginValidator, login);

module.exports = {
  authRouter,
};
