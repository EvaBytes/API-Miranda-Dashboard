import express, { Request, Response } from "express";
import { getAllRooms, getRoom, createRoom, updateRoom, deleteRoom } from "../services/roomsServices";
import { asyncHandler } from "../utils/asyncHandler";
import { validateRoom } from '../validators/roomsValidator';

export const roomRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - roomPhoto
 *         - roomNumber
 *         - roomType
 *         - facilities
 *         - rate
 *         - offerPrice
 *         - status
 *         - guest
 *         - orderDate
 *         - checkIn
 *         - checkOut
 *       properties:
 *         roomPhoto:
 *           type: string
 *           description: URL of the room photo
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
 */

/**
 * @swagger
 * /api-dashboard/rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: List of all rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */
roomRouter.get('/', asyncHandler(async (req: Request, res: Response) => {
    const rooms = await getAllRooms();
    res.status(200).json({ data: rooms });
}));

/**
 * @swagger
 * /api-dashboard/rooms/{id}:
 *   get:
 *     summary: Get room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Room data
 *         content:
 *           application/json
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Room not found
 */
roomRouter.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    const room = await getRoom(req.params.id);
    if (room) {
        res.status(200).json({ data: room });
    } else {
        res.status(404).json({ error: 'Room not found' });
    }
}));

/**
 * @swagger
 * /api-dashboard/rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Room created successfully
 *         content:
 *           application/json
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       400:
 *         description: Invalid input
 */
roomRouter.post('/', validateRoom, asyncHandler(async (req: Request, res: Response) => {
    const newRoom = await createRoom(req.body);
    res.status(201).json({ data: newRoom });
}));

/**
 * @swagger
 * /api-dashboard/rooms/{id}:
 *   patch:
 *     summary: Update room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: Room updated successfully
 *         content:
 *           application/json
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Room not found
 */
roomRouter.patch('/:id', validateRoom, asyncHandler(async (req: Request, res: Response) => {
    const updatedRoom = await updateRoom(req.params.id, req.body);
    if (updatedRoom) {
        res.status(200).json({ data: `Room with _id [${req.params.id}] updated!` });
    } else {
        res.status(404).json({ error: 'Room not found' });
    }
}));

/**
 * @swagger
 * /api-dashboard/rooms/{id}:
 *   delete:
 *     summary: Delete room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       404:
 *         description: Room not found
 */
roomRouter.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
    const deletedRoom = await deleteRoom(req.params.id);
    if (deletedRoom) {
        res.status(200).json({ data: `Room with _id [${req.params.id}] deleted!` });
    } else {
        res.status(404).json({ error: 'Room not found' });
    }
}));