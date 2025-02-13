import express, { Request, Response } from "express";
import { createMessage, deleteMessage, getAllMessages, getMessage, updateMessage } from "../services/contactServices";
import { asyncHandler } from "../utils/asyncHandler";

export const contactRouter = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Contact
 *     description: Contacts Management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         photo:
 *           type: string
 *           example: "/Profile2.png"
 *         date:
 *           type: string
 *           example: "Nov 27th 2020 12:00 AM"
 *         messageId:
 *           type: string
 *           example: "0011"
 *         fullName:
 *           type: string
 *           example: "Lindon Lyal"
 *         email:
 *           type: string
 *           example: "llyala@xrea.com"
 *         phone:
 *           type: string
 *           example: "584-238-9970"
 *         subject:
 *           type: string
 *           example: "Sharable intangible service-desk"
 *         comment:
 *           type: string
 *           example: "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus."
 *         status:
 *           type: string
 *           example: "read"
 */


/**
 * @swagger
 * /api/v1/contact:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: List of all messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
contactRouter.get('/', asyncHandler(async (req: Request, res: Response) => {
    const messages = await getAllMessages();
    res.status(200).json({ data: messages });
}));

/**
 * @swagger
 * /api/v1/contact/{messageId}:
 *   get:
 *     summary: Get message by messageId
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MessageId
 *     responses:
 *       200:
 *         description: Message data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message not found
 */
contactRouter.get('/:messageId', asyncHandler(async (req: Request, res: Response) => {
    const message = await getMessage(req.params.messageId);
    if (message) {res.status(200).json({ data: message });
    } else {res.status(404).json({ error: 'Message not found' });}
}));

/**
 * @swagger
 * /api/v1/contact:
 *   post:
 *     summary: Create a new message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: Message created successfully
 *         content:
 *           application/json:
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
 * /api/v1/contact/{messageId}:
 *   put:
 *     summary: Update message by messageId
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MessageId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: Message updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Message not found
 */
contactRouter.put('/:messageId', asyncHandler(async (req: Request, res: Response) => {
    const updatedMessage = await updateMessage(req.params.messageId, req.body);
    if (updatedMessage) {res.status(200).json({ data: `Message with messageId [${req.params.messageId}] updated!` });
    } else {res.status(404).json({ error: 'Message not found' });}
}));

/**
 * @swagger
 * /api/v1/contact/{messageId}:
 *   delete:
 *     summary: Delete message by messageId
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MessageId
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       404:
 *         description: Message not found
 */
contactRouter.delete('/:messageId', asyncHandler(async (req: Request, res: Response) => {
    const deletedMessage = await deleteMessage(req.params.messageId);
    if (deletedMessage) {res.status(200).json({ data: `Message with messageId [${req.params.messageId}] deleted!` });
    } else {res.status(404).json({ error: 'Message not found' });}
}));