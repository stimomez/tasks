const express = require('express');

const {
  getAllUsers,
  getUserById,
  disabledUserById,
  updateUserById,
  createUser,
} = require('../controllers/users.controller');

const { userExist } = require('../middlewares/users.middleware');
const {
  createUserValidators,
} = require('../middlewares/validators.middleware');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);
usersRouter.post('/', createUserValidators, createUser);

usersRouter
  .route('/:id')
  .get(userExist, getUserById)
  .patch(userExist, updateUserById)
  .delete(userExist, disabledUserById);

module.exports = { usersRouter };
