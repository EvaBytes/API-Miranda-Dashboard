import express, { Request, Response } from "express";
import { createMessage, deleteMessage, getAllMessages, getMessage, updateMessage } from "../services/contactServices";
import { asyncHandler } from "../utils/asyncHandler";

export const contactRouter = express.Router();

/**
 * @swagger
 * /api/v1/contact:
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
 * /api/v1/contact/{id}:
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
contactRouter.get('/:messageId', asyncHandler(async (req: Request, res: Response) => {
    const message = await getMessage(req.params.messageId);
    if (message) {
        res.status(200).json({ data: message });
    } else {
        res.status(404).json({ error: 'Message not found' });
    }
}));

/**
 * @swagger
 * /api/v1/contact:
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
contactRouter.post('/', asyncHandler(async (req: Request, res: Response) => {
    const newMessage = await createMessage(req.body);
    res.status(201).json({ data: newMessage });
}));

/**
 * @swagger
 * /api/v1/contact/{id}:
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
contactRouter.put('/:messageId', asyncHandler(async (req: Request, res: Response) => {
    const updatedMessage = await updateMessage(req.params.messageId, req.body);
    if (updatedMessage) {
        res.status(200).json({ data: `Message with messageId [${req.params.messageId}] updated!` });
    } else {
        res.status(404).json({ error: 'Message not found' });
    }
}));

/**
 * @swagger
 * /api/v1/contact/{id}:
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
contactRouter.delete('/:messageId', asyncHandler(async (req: Request, res: Response) => {
    const deletedMessage = await deleteMessage(req.params.messageId);
    if (deletedMessage) {
        res.status(200).json({ data: `Message with messageId [${req.params.messageId}] deleted!` });
    } else {
        res.status(404).json({ error: 'Message not found' });
    }
}));