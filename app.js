const express = require('express');

const { usersRouter } = require('./routes/users.routes');
const { tasksRouter } = require('./routes/tasks.routes');

const app = express();

const { globalErrorHandler } = require('./controllers/error.controller');

const { AppError } = require('./utils/appError.util');

app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', tasksRouter);
app.all('*', (req, res, next) => {
  next(
    new AppError(`${req.method} ${req.originalUrl} /not found in this server`),
    404
  );
});

app.use(globalErrorHandler);

module.exports = { app };
