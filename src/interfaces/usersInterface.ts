import { Document } from 'mongoose';

export interface UserDocument extends Document {
    photo: string;
    name: string;
    employeeId: string;
    email: string;
    password: string;
    startDate: string | number;
    description: string;
    contact: string;
    status: "ACTIVE" | "INACTIVE";
}