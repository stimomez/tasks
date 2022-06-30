const { body, validationResult } = require('express-validator');
const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map(err => err.msg)
      .join('. ');

    return next(new AppError(message, 400));
  }
  next()
};

const createUserValidators = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email').isEmail().withMessage('Must provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .isAlphanumeric()
    .withMessage('Password must contain letters and numbers'),
  checkResult,
];

const createTaskValidators = [
  body('title').notEmpty().withMessage('Name cannot be empty'),
  body('userId').isNumeric().withMessage('only numerical value'),
  checkResult,
];

module.exports = { createUserValidators, createTaskValidators };
