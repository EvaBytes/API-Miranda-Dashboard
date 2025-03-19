import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserModel } from '../models/usersModels'; 
import { AuthCredentials } from '../interfaces/authInterface';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || '123456';

export const verifyJWTMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { userId: number };  

        const user = await UserModel.findByPk(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = {
            id: user.id,
            email: user.email,
            name: user.name,
        };

        console.log("User verified:", user.email);
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};
