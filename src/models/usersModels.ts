import mongoose from 'mongoose';
import { UserDocument } from '../interfaces/usersInterface'; 

const UserSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true,
        description: 'URL of the users profile picture'
    },
    name: {
        type: String,
        required: true,
        description: 'Full name of the user'
    },
    employeeId: {
        type: String,
        required: true,
        description: 'Unique identifier for the user'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        description: 'Email address of the user'
    },
    password: {
        type: String,
        required: true,
        description: 'Users password'
    },
    startDate: {
        type: String,
        required: true,
        description: 'Users start date in the company'
    },
    description: {
        type: String,
        required: true,
        description: 'Job description of the user'
    },
    contact: {
        type: String,
        required: true,
        description: 'Contact number of the user'
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        required: true,
        description: 'Current status of the user'
    }
});

export const User = mongoose.model<UserDocument>('User', UserSchema);
export {UserDocument};