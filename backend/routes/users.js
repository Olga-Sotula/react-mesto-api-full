const express = require('express');
const { getUserValidator, updateUserProfileValidator, updateUserAvatarValidator } = require('../middlewares/validation');

const userRouter = express.Router();
const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', getCurrentUser);
userRouter.get('/users/:id', getUserValidator, getUserById);
userRouter.patch('/users/me', updateUserProfileValidator, updateUserProfile);
userRouter.patch('/users/me/avatar', updateUserAvatarValidator, updateUserAvatar);

module.exports = {
  userRouter,
};
