const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');

const { catchAsync } = require('../utils/catchAsync.util');

const getAllUsers = catchAsync(async (req, res, next) => {
  const status = 'active';
  const users = await User.findAll({ where: { status } }, { include: Task });

  res.status(200).json({
    status: 'success',
    users,
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    user,
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    status: 'success',
    newUser,
  });
});

const updateUserById = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });

  res.status(204).json({ status: 'success' });
});

const disabledUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  res.status(204).json({ status: 'success' });
});

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  disabledUserById,
};
