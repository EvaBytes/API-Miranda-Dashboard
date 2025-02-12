import express, { Request, Response } from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "../services/usersServices";
import { asyncHandler } from "../utils/asyncHandler";
import { validateUser } from '../validators/usersValidator';

export const userRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - photo
 *         - name
 *         - employeeId
 *         - email
 *         - startDate
 *         - description
 *         - contact
 *         - status
 *       properties:
 *         photo:
 *           type: string
 *           description: URL of the profile photo
 *         name:
 *           type: string
 *           description: Name of the user
 *         employeeId:
 *           type: string
 *           description: Employee ID
 *         email:
 *           type: string
 *           description: Email of the user
 *         startDate:
 *           type: string
 *           description: Start date of the user
 *         description:
 *           type: string
 *           description: Description of the user
 *         contact:
 *           type: string
 *           description: Contact number of the user
 *         status:
 *           type: string
 *           description: Status of the user
 */

/**
 * @swagger
 * /api-dashboard/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', asyncHandler(async (req: Request, res: Response) => {
    const users = await getAllUsers();
    res.status(200).json({ data: users });
}));

/**
 * @swagger
 * /api-dashboard/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
userRouter.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    const user = await getUser(req.params.id);
    if (user) {
        res.status(200).json({ data: user });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
}));

/**
 * @swagger
 * /api-dashboard/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 */
userRouter.post('/', validateUser, asyncHandler(async (req: Request, res: Response) => {
    const newUser = await createUser(req.body);
    res.status(201).json({ data: newUser });
}));

/**
 * @swagger
 * /api-dashboard/users/{id}:
 *   patch:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
userRouter.patch('/:id', validateUser, asyncHandler(async (req: Request, res: Response) => {
    const updatedUser = await updateUser(req.params.id, req.body);
    if (updatedUser) {
        res.status(200).json({ data: `User with _id [${req.params.id}] updated!` });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
}));

/**
 * @swagger
 * /api-dashboard/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
userRouter.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
    const deletedUser = await deleteUser(req.params.id);
    if (deletedUser) {
        res.status(200).json({ data: `User with _id [${req.params.id}] deleted!` });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
}));