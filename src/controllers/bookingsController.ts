import express, { Request, Response } from "express";
import { getAllBookings, getBooking, createBooking, updateBooking, deleteBooking } from "../services/bookingsServices";
import { asyncHandler } from "../utils/asyncHandler";
import { validateBooking } from '../validators/bookingsValidator';

export const bookingRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - roomNumber
 *         - roomType
 *         - facilities
 *         - rate
 *         - status
 *         - guest
 *         - orderDate
 *         - checkIn
 *         - checkOut
 *         - specialRequest
 *       properties:
 *         photo:
 *           type: string
 *           description: URL of the room photo
 *         roomPhoto:
 *           type: array
 *           items:
 *             type: string
 *           description: List of URLs of room photos
 *         roomNumber:
 *           type: string
 *           description: Room number
 *         roomType:
 *           type: string
 *           description: Type of the room
 *         facilities:
 *           type: string
 *           description: Facilities available in the room
 *         rate:
 *           type: string
 *           description: Room rate
 *         offerPrice:
 *           type: string
 *           description: Offer price
 *         status:
 *           type: string
 *           description: Booking status
 *         guest:
 *           type: object
 *           properties:
 *             fullName:
 *               type: string
 *               description: Full name of the guest
 *             reservationNumber:
 *               type: string
 *               description: Reservation number
 *             image:
 *               type: string
 *               description: URL of the guest's profile image
 *         orderDate:
 *           type: string
 *           description: Order date
 *         checkIn:
 *           type: string
 *           format: date
 *           description: Check-in date
 *         checkOut:
 *           type: string
 *           format: date
 *           description: Check-out date
 *         specialRequest:
 *           type: string
 *           description: Special request
 */

/**
 * @swagger
 * /api-dashboard/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */
bookingRouter.get('/', asyncHandler(async (req: Request, res: Response) => {
    const bookings = await getAllBookings();
    res.status(200).json({ data: bookings });
}));

/**
 * @swagger
 * /api-dashboard/bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking data
 *         content:
 *           application/json
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found
 */
bookingRouter.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    const booking = await getBooking(req.params.id);
    if (booking) {
        res.status(200).json({ data: booking });
    } else {
        res.status(404).json({ error: 'Booking not found' });
    }
}));

/**
 * @swagger
 * /api-dashboard/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid input
 */
bookingRouter.post('/', validateBooking, asyncHandler(async (req: Request, res: Response) => {
    const newBooking = await createBooking(req.body);
    res.status(201).json({ data: newBooking });
}));

/**
 * @swagger
 * /api-dashboard/bookings/{id}:
 *   patch:
 *     summary: Update booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *         content:
 *           application/json
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Booking not found
 */
bookingRouter.patch('/:id', validateBooking, asyncHandler(async (req: Request, res: Response) => {
    const updatedBooking = await updateBooking(req.params.id, req.body);
    if (updatedBooking) {
        res.status(200).json({ data: `Booking with _id [${req.params.id}] updated!` });
    } else {
        res.status(404).json({ error: 'Booking not found' });
    }
}));

/**
 * @swagger
 * /api-dashboard/bookings/{id}:
 *   delete:
 *     summary: Delete booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 */
bookingRouter.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
    const deletedBooking = await deleteBooking(req.params.id);
    if (deletedBooking) {
        res.status(200).json({ data: `Booking with _id [${req.params.id}] deleted!` });
    } else {
        res.status(404).json({ error: 'Booking not found' });
    }
}));