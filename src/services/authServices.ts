import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || '123456';  
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');  

const usersPath = path.resolve(__dirname, '../data/Users.json');
const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));  

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS); 
}

export class AuthService {
    static async authenticate(username: string, password: string): Promise<string> {
        const user = users.find((user: { email: string }) => user.email === username);

        if (!user) {
            throw new AuthError('User not found');
        }
        console.log(password,user.password)
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(await hashPassword(password))
        if (!passwordMatch) {
            throw new AuthError('Invalid credentials');
        }

        return jwt.sign({ username: user.email, name: user.name }, SECRET_KEY, { expiresIn: '1h' });
    }
}

export class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthError';
    }
}
