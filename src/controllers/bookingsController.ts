import express, { Request, Response } from "express";
import { getAllBookings, getBooking, createBooking, updateBooking, deleteBooking } from "../services/bookingsServices";
import { asyncHandler } from "../utils/asyncHandler";

export const bookingRouter = express.Router();

/**
 * @swagger
 * /api/v1/bookings:
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
 * /api/v1/bookings/{id}:
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
 * /api/v1/bookings:
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
bookingRouter.post('/', asyncHandler(async (req: Request, res: Response) => {
    const newBooking = await createBooking(req.body);
    res.status(201).json({ data: newBooking });
}));

/**
 * @swagger
 * /api/v1/bookings/{id}:
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
bookingRouter.patch('/:id', asyncHandler(async (req: Request, res: Response) => {
    const updatedBooking = await updateBooking(req.params.id, req.body);
    if (updatedBooking) {
        res.status(200).json({ data: `Booking with _id [${req.params.id}] updated!` });
    } else {
        res.status(404).json({ error: 'Booking not found' });
    }
}));

/**
 * @swagger
 * /api/v1/bookings/{id}:
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

