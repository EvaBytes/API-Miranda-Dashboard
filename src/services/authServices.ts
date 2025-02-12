import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || "secret-key";
const USER = {
    username: "user@testing.com",
    password: "123456"
};

export class AuthService {
    static async authenticate(username: string, password: string): Promise<string> {
        if (username === USER.username && password === USER.password) {
            return jwt.sign({ username: USER.username }, SECRET_KEY, { expiresIn: '1h' });
        } else {
            throw new AuthError('Invalid credentials');
        }
    }
}

export class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthError';
    }
}