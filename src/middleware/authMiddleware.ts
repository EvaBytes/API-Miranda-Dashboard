import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserDocument } from '../models/usersModels'; 
import { User } from '../models/usersModels'; 


dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || '123456';

export interface AuthenticatedRequest extends Request {
  user?: UserDocument;  
}

export const verifyJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return; 
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };  

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    req.user = user;  
    return next();  

  } catch (err) {
    console.error(err); 
    res.status(401).json({ error: 'Invalid token' });
    return; 
  }
};
