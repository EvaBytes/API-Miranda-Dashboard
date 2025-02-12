import express, { Request, Response } from "express";
import { getAllRooms, getRoom, createRoom, updateRoom, deleteRoom } from "../services/roomsServices";
import { asyncHandler } from "../utils/asyncHandler";

export const roomRouter = express.Router();

/**
 * @swagger
 * /api/v1/rooms:
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
 * /api/v1/rooms/{id}:
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
roomRouter.get('/:roomNumber', asyncHandler(async (req: Request, res: Response) => {
    const room = await getRoom(req.params.roomNumber);
    if (room) {
        res.status(200).json({ data: room });
    } else {
        res.status(404).json({ error: 'Room not found' });
    }
}));

/**
 * @swagger
 * /api/v1/rooms:
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
roomRouter.post('/roomNumber', asyncHandler(async (req: Request, res: Response) => {
    const newRoom = await createRoom(req.body);
    res.status(201).json({ data: newRoom });
}));

/**
 * @swagger
 * /api/v1/rooms/{id}:
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
roomRouter.put('/:roomNumber', asyncHandler(async (req: Request, res: Response) => {
    const updatedRoom = await updateRoom(req.params.roomNumber, req.body);
    if (updatedRoom) {
        res.status(200).json({ data: `Room with roomNumber [${req.params.roomNumber}] updated!` });
    } else {
        res.status(404).json({ error: 'Room not found' });
    }
}));

/**
 * @swagger
 * /api/v1/rooms/{id}:
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
roomRouter.delete('/:roomNumber', asyncHandler(async (req: Request, res: Response) => {
    const deletedRoom = await deleteRoom(req.params.roomNumber);
    if (deletedRoom) {
        res.status(200).json({ data: `Room with roomNumber [${req.params.roomNumber}] deleted!` });
    } else {
        res.status(404).json({ error: 'Room not found' });
    }
}));