import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/usersModels';
import { UserDocument } from '../interfaces/usersInterface';
import { asyncHandler } from '../utils/asyncHandler';  

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || '123456';

export interface AuthenticatedRequest extends Request {
  user?: UserDocument;  
}

const verifyJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
  const user = await User.findById(decoded.userId);

  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  req.user = user;
  console.log("User verified:", user.email);
  next();
};

export const verifyJWTMiddleware = asyncHandler(verifyJWT);
