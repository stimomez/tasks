const { Task } = require('../models/task.model');
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const validateStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;
  
  if (
    !(
      status === 'active' ||
      status === 'completed' ||
      status === 'late' ||
      status === 'cancelled'
    )
  ) {
    return next(new AppError('Invalid state', 404));
  }

  next();
});

const taskExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const status = 'active';

  const task = await Task.findOne( { where: { status, id } });

  if (!task) {
    return next(new AppError('task not found', 404));
  }
  req.task = task;
  next();
});

module.exports = { validateStatus, taskExist };
