import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/usersModels';
import { AuthCredentials } from '../interfaces/authInterface';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || '123456';  

export async function hashPassword(password: string): Promise<string> {
    const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '15');  
    return bcrypt.hash(password, SALT_ROUNDS); 
}

export class AuthService {
    static async authenticate({email, password}:AuthCredentials): Promise<string> {
        const user = await User.findOne({ email: email });

        if (!user) {
            throw new AuthError('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            throw new AuthError('Invalid credentials');
        }

        return jwt.sign(
            { userId: user._id, email: user.email, name: user.name }, 
            SECRET_KEY, 
            { expiresIn: '1h' }
        );
    }
}

export class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthError';
    }
}
