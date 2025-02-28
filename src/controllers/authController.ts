import express, { Request, Response } from 'express';
import { AuthService, AuthError } from '../services/authServices';
import { AuthValidator } from '../validators/authValidator';
import { AuthCredentials } from '../interfaces/authInterface';

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
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user1@example.com"
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
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
authRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as AuthCredentials;
        const validation = AuthValidator.validate({ email, password });
        if (!validation.valid) {
            return res.status(400).json({ errors: validation.errors });
        }
        const token = await AuthService.authenticate({ email, password });

        return res.status(200).json({ token });
    } catch (error) {
        if (error instanceof AuthError) {
            return res.status(401).json({ error: error.message });
        }

        console.error('Authentication error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
