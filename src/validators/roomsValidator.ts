import { body } from 'express-validator';

export const validateRoom = [
  body('roomPhoto').isString().withMessage('Room photo must be a string'),
  body('roomNumber').isString().withMessage('Room number must be a string'),
  body('roomType').isString().withMessage('Room type must be a string'),
  body('facilities').isString().withMessage('Facilities must be a string'),
  body('rate').isString().withMessage('Rate must be a string'),
  body('offerPrice').isString().withMessage('Offer price must be a string'),
  body('status').isString().withMessage('Status must be a string'),
  body('guest').isObject().withMessage('Guest must be an object'),
  body('guest.fullName').isString().withMessage('Guest full name must be a string'),
  body('guest.reservationNumber').isString().withMessage('Reservation number must be a string'),
  body('guest.image').isString().withMessage('Guest image must be a string'),
  body('orderDate').isString().withMessage('Order date must be a valid date string'),
  body('checkIn').isString().withMessage('Check-in date must be a valid date string'),
  body('checkOut').isString().withMessage('Check-out date must be a valid date string')
];