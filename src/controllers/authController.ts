import express, { Request, Response } from 'express';
import { AuthService, AuthError } from '../services/authServices';
import { asyncHandler } from '../utils/asyncHandler';

export const authRouter = express.Router();

authRouter.post('/login', asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
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