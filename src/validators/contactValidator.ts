import { body } from 'express-validator';

export const validateMessage = [
  body('photo').isString().withMessage('Photo must be a string'),
  body('date').isString().withMessage('Date must be a valid date string'),
  body('messageId').isString().withMessage('Message ID must be a string'),
  body('fullName').isString().withMessage('Full name must be a string'),
  body('email').isEmail().withMessage('Email must be a valid email address'),
  body('phone').isString().withMessage('Phone number must be a string'),
  body('subject').isString().withMessage('Subject must be a string'),
  body('comment').isString().withMessage('Comment must be a string'),
  body('status').isString().withMessage('Status must be a string')
];