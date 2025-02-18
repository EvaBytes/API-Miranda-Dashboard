import { Request, Response } from 'express';
import { UserDocument } from "../interfaces/usersInterface";

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
};

const isValidDate = (date: string | number): boolean => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
};

const isValidContact = (contact: string): boolean => {
    const phoneRegex = /^[0-9]{9,12}$/; 
    return phoneRegex.test(contact);
};

export const validateUser = (req: Request, res: Response) => {
    const { photo, name, employeeId, email, startDate, description, contact, status } = req.body as UserDocument;  

    if (!photo || typeof photo !== 'string') {
        return res.status(400).json({ error: 'Photo is required and must be a string.' });
    }

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name is required and must be a non-empty string.' });
    }

    if (!employeeId || typeof employeeId !== 'string') {
        return res.status(400).json({ error: 'Employee ID is required and must be a string.' });
    }

    if (!email || !isValidEmail(email)) {
        return res.status(400).json({ error: 'Email is required and must be a valid email address.' });
    }

    if (!startDate || !isValidDate(startDate)) {
        return res.status(400).json({ error: 'Start Date is required and must be a valid date.' });
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ error: 'Description is required and must be a non-empty string.' });
    }

    if (!contact || !isValidContact(contact)) {
        return res.status(400).json({ error: 'Contact is required and must be a valid phone number.' });
    }

    if (!status || (status !== 'ACTIVE' && status !== 'INACTIVE')) {
        return res.status(400).json({ error: 'Status is required and must be either "ACTIVE" or "INACTIVE".' });
    }

};
