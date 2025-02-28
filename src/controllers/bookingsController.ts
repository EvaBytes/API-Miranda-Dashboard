import express, { Request, Response } from "express";
import {getAllBookings,getBooking,createBooking,updateBooking,deleteBooking} from "../services/bookingsServices";
import { asyncHandler } from "../utils/asyncHandler";
import { BookingValidator } from "../validators/bookingsValidator";

export const bookingRouter = express.Router();
const validator = new BookingValidator();

/**
 * @swagger
 * tags:
 *   - name: Bookings
 *     description: Bookings Management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         guest:
 *           type: object
 *           properties:
 *             fullName:
 *               type: string
 *               example: "Gilberta Raymen"
 *             reservationNumber:
 *               type: string
 *               example: "1234563389"
 *         roomNumber:
 *           type: string
 *           example: "9667"
 *         roomType:
 *           type: string
 *           example: "Double Bed Superior"
 *         facilities:
 *           type: string
 *           example: "Air conditioner, WiFi, Breakfast, Shower, Towels"
 *         rate:
 *           type: string
 *           example: "425$"
 *         offerPrice:
 *           type: string
 *           example: "350$"
 *         status:
 *           type: string
 *           example: "In Progress"
 *         orderDate:
 *           type: string
 *           example: "2024-03-30T06:38:00Z"
 *         checkIn:
 *           type: string
 *           example: "2024-12-23"
 *         checkOut:
 *           type: string
 *           example: "2024-11-15"
 *         specialRequest:
 *           type: string
 *           example: "Kid-friendly bedding or a themed room (if available)"
 */

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
bookingRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const bookings = await getAllBookings();
    res.status(200).json({ data: bookings });
  })
);

/**
 * @swagger
 * /api/v1/bookings/{reservationNumber}:
 *   get:
 *     summary: Get booking by Reservation Number
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: reservationNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Reservation Number
 *     responses:
 *       200:
 *         description: Booking data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found
 */
bookingRouter.get(
  "/:reservationNumber",
  asyncHandler(async (req: Request, res: Response) => {
    const reservationNumber = req.params.reservationNumber;
    const booking = await getBooking(reservationNumber);

    if (booking) {
      res.status(200).json({ data: booking });
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  })
);

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
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid input
 */
bookingRouter.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const validation = validator.validate(req.body);

    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }

    const newBooking = await createBooking(req.body);
    res.status(201).json({ data: newBooking });
  })
);

/**
 * @swagger
 * /api/v1/bookings/{reservationNumber}:
 *   put:
 *     summary: Update booking by Reservation Number
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: reservationNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Reservation Number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Booking not found
 */
bookingRouter.put(
  "/:reservationNumber",
  asyncHandler(async (req: Request, res: Response) => {
    const updatedBooking = await updateBooking(
      req.params.reservationNumber,
      req.body
    );
    if (updatedBooking) {
      res
        .status(201)
        .json({
          data: `Booking with reservationNumber [${req.params.reservationNumber}] updated!`,
        });
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  })
);

/**
 * @swagger
 * /api/v1/bookings/{reservationNumber}:
 *   delete:
 *     summary: Delete booking by Reservation Number
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: reservationNumber
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
bookingRouter.delete(
  "/:reservationNumber",
  asyncHandler(async (req: Request, res: Response) => {
    const deletedBooking = await deleteBooking(req.params.reservationNumber);

    if (deletedBooking) {
      res.status(204).json({ data: "Booking deleted successfully" });
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  })
);
