const { Task } = require('../models/task.model');
const { catchAsync } = require('../utils/catchAsync.util');

const getAllTasks = catchAsync(async (req, res) => {
  const tasks = await Task.findAll();

  res.status(200).json({
    status: 'success',
    tasks,
  });
});

const getTaskByStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;
  const tasks = await Task.findAll({ where: { status } });
 
  if (!tasks.length) {
    const mesagge = `no tasks with ${status} status `;
    res.status(202).json({
      status: 'accepted',
      mesagge,
    });
  }

  res.status(200).json({
    status: 'success',
    tasks,
  });
});

const createTasks = catchAsync(async (req, res, next) => {
  const { title, userId, limitDate } = req.body;

  const startDate = new Date();

  const newTask = await Task.create({
    title,
    userId,
    limitDate,
    startDate,
  });

  res.status(200).json({
    status: 'success',
    newTask,
  });
});

const updateTaskById = catchAsync(async (req, res, next) => {
  const { time } = req.body;
  const deliverDate = new Date(time);
  const { task } = req;
  const { limitDate } = task;

  if (limitDate > deliverDate) {
    const status = 'completed';
    await task.update({ status });
    res.status(204).json({ status: 'success' });
  }
  if (limitDate < deliverDate) {
    const status = 'late';
    await task.update({ status });
    res.status(204).json({ status: 'success' });
  }
});

const cancelTaskById = catchAsync(async (req, res, next) => {
  const { task } = req;
  await task.update({ status: 'cancelled' });
  res.status(204).json({ status: 'success' });
});

module.exports = {
  getAllTasks,
  createTasks,
  getTaskByStatus,
  updateTaskById,
  cancelTaskById,
};
