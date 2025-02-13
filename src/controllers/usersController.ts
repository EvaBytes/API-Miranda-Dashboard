import express, { Request, Response } from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "../services/usersServices";
import { asyncHandler } from "../utils/asyncHandler";

export const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Users Management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         photo:
 *           type: string
 *           example: "/Profile2.png"
 *         name:
 *           type: string
 *           example: "Shaun Jaycox"
 *         employeeId:
 *           type: string
 *           example: "32"
 *         email:
 *           type: string
 *           example: "user@testing.com"
 *         password:
 *           type: string
 *           example: "123456"
 *         startDate:
 *           type: string
 *           example: "13/11/2024"
 *         description:
 *           type: string
 *           example: "Front Desk Receptionist."
 *         contact:
 *           type: string
 *           example: "733-960-2795"
 *         status:
 *           type: string
 *           example: "ACTIVE"
 */

/**
 * @swagger
 * /api/v1/users:
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
 * /api/v1/users/{employeeId}:
 *   get:
 *     summary: Get user by Employee ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
userRouter.get('/:employeeId', asyncHandler(async (req: Request, res: Response) => {
    const user = await getUser(req.params.employeeId);
    if (user) {res.status(200).json({ data: user });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
}));

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 */
userRouter.post('/', asyncHandler(async (req: Request, res: Response) => {
    const newUser = await createUser(req.body);
    res.status(201).json({ data: newUser });
}));

/**
 * @swagger
 * /api/v1/users/{employeeId}:
 *   put:
 *     summary: Replace user data by Employee ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User replaced successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
userRouter.put("/:employeeId", asyncHandler(async (req: Request, res: Response) => {
    const updatedUser = await updateUser(req.params.employeeId, req.body);
    if (updatedUser) {res.status(200).json({ data: updatedUser });
    } else {res.status(404).json({ error: "User not found" });}
}));

/**
 * @swagger
 * /api/v1/users/{employeeId}:
 *   delete:
 *     summary: Delete user by Employee ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
userRouter.delete('/:employeeId', asyncHandler(async (req: Request, res: Response) => {
    const deletedUser = await deleteUser(req.params.employeeId);
    if (deletedUser) {res.status(200).json({ data: `User with employeeId [${req.params.employeeId}] deleted!` });
    } else {res.status(404).json({ error: 'User not found' });}
}));