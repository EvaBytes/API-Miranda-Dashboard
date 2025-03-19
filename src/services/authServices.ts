import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserModel } from '../models/usersModels'; 
import { AuthCredentials } from '../interfaces/authInterface';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || '123456';

export async function hashPassword(password: string): Promise<string> {
    const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '15');
    return bcrypt.hash(password, SALT_ROUNDS);
}

export class AuthService {
    static async authenticate({ email, password }: AuthCredentials): Promise<string> {
        try {
            const user = await UserModel.findOne({ where: { email: email } });

            if (!user) {
                throw new AuthError('User not found');
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw new AuthError('Invalid credentials');
            }

            return jwt.sign(
                { userId: user.id, email: user.email, name: user.name },
                SECRET_KEY,
                { expiresIn: '30m' }
            );
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new AuthError(error.message || 'Authentication failed');
            }
            throw new AuthError('Authentication failed');
        }
    }
}

export class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthError';
    }
}
