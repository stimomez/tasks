const express = require('express');
const {
  getAllTasks,
  createTasks,
  updateTaskById,
  cancelTaskById,
  getTaskByStatus,
} = require('../controllers/tasks.controller');

const {
  validateStatus,
  taskExist,
} = require('../middlewares/tasks.middleware');

const {
  createTaskValidators,
} = require('../middlewares/validators.middleware');

const tasksRouter = express.Router();

tasksRouter.get('/', getAllTasks);
tasksRouter.post('/', createTaskValidators, createTasks);

tasksRouter.get('/:status', validateStatus,getTaskByStatus);
tasksRouter
  .route('/:id')
  .patch(taskExist, updateTaskById)
  .delete(taskExist, cancelTaskById);

module.exports = { tasksRouter };
