import { Request, Response} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';

export const login = (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send({ error: 'Email and password are required' });
        return;
    }

    if (email === 'user@testing.com' && password === '123456') {
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).send({ token });
    } else {
        res.status(401).send({ error: 'Invalid credentials' });
    }
};