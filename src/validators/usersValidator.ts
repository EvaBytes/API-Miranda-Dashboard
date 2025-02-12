import { body } from 'express-validator';

export const validateUser = [
  body('photo').isString().withMessage('Photo must be a string'),
  body('name').isString().withMessage('Name must be a string'),
  body('employeeId').isString().withMessage('Employee ID must be a string'),
  body('email').isEmail().withMessage('Email must be a valid email address'),
  body('startDate').isString().withMessage('Start date must be a valid date string'),
  body('description').isString().withMessage('Description must be a string'),
  body('contact').isString().withMessage('Contact number must be a string'),
  body('status').isString().withMessage('Status must be a string')
];