import express, { Request, Response } from 'express';
import { AuthService, AuthError } from '../services/authServices';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthValidator } from '../validators/authValidator'; 

export const authRouter = express.Router();

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Authenticate user and return a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user@testing.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1..."
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Internal server error
 */
authRouter.post('/', asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const { valid, errors } = AuthValidator.validate({ username, password });

    if (!valid) {return res.status(400).json({ errors });}

    try {
        const token = await AuthService.authenticate(username, password);
        res.json({ token });
    } catch (error) {
        if (error instanceof AuthError) {
            res.status(401).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}));
