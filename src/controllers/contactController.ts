import express, { Request, Response } from "express";
import { createMessage, deleteMessage, getAllMessages, getMessage, updateMessage } from "../services/contactServices";
import { asyncHandler } from "../utils/asyncHandler";
import { validateMessage } from '../validators/contactValidator';

export const contactRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - phone
 *         - subject
 *         - comment
 *         - status
 *       properties:
 *         photo:
 *           type: string
 *           description: URL of the profile photo
 *         date:
 *           type: string
 *           description: Date of the message
 *         messageId:
 *           type: string
 *           description: Unique ID of the message
 *         fullName:
 *           type: string
 *           description: Full name of the person
 *         email:
 *           type: string
 *           description: Email of the person
 *         phone:
 *           type: string
 *           description: Phone number of the person
 *         subject:
 *           type: string
 *           description: Subject of the message
 *         comment:
 *           type: string
 *           description: Content of the message
 *         status:
 *           type: string
 *           description: Status of the message
 */

/**
 * @swagger
 * /api-dashboard/messages:
 *   get:
 *     summary: Get all messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: List of all messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */
contactRouter.get('/', asyncHandler(async (req: Request, res: Response) => {
    const messages = await getAllMessages();
    res.status(200).json({ data: messages });
}));

/**
 * @swagger
 * /api-dashboard/messages/{id}:
 *   get:
 *     summary: Get message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message data
 *         content:
 *           application/json
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message not found
 */
contactRouter.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    const message = await getMessage(req.params.id);
    if (message) {
        res.status(200).json({ data: message });
    } else {
        res.status(404).json({ error: 'Message not found' });
    }
}));

/**
 * @swagger
 * /api-dashboard/messages:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: Message created successfully
 *         content:
 *           application/json
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Invalid input
 */
contactRouter.post('/', validateMessage, asyncHandler(async (req: Request, res: Response) => {
    const newMessage = await createMessage(req.body);
    res.status(201).json({ data: newMessage });
}));

/**
 * @swagger
 * /api-dashboard/messages/{id}:
 *   patch:
 *     summary: Update message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Message ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: Message updated successfully
 *         content:
 *           application/json
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Message not found
 */
contactRouter.patch('/:id', validateMessage, asyncHandler(async (req: Request, res: Response) => {
    const updatedMessage = await updateMessage(req.params.id, req.body);
    if (updatedMessage) {
        res.status(200).json({ data: `Message with _id [${req.params.id}] updated!` });
    } else {
        res.status(404).json({ error: 'Message not found' });
    }
}));

/**
 * @swagger
 * /api-dashboard/messages/{id}:
 *   delete:
 *     summary: Delete message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       404:
 *         description: Message not found
 */
contactRouter.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
    const deletedMessage = await deleteMessage(req.params.id);
    if (deletedMessage) {
        res.status(200).json({ data: `Message with _id [${req.params.id}] deleted!` });
    } else {
        res.status(404).json({ error: 'Message not found' });
    }
}));