import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || '123456';

export interface AuthenticatedRequest extends Request {user?: any;}

export const verifyJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1]; 

    if (!token) {
        res.status(401).json({ error: 'Access denied. No token provided.' });
        return; 
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; 
        return next(); 
    } catch (err) {res.status(401).json({ error: 'Invalid token' });
        return; 
    }
};
