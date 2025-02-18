import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true,
        description: 'URL of the contacts profile photo'
    },
    date: {
        type: String,
        required: true,
        description: 'Date and time of the message'
    },
    messageId: {
        type: String,
        required: true,
        unique: true,
        description: 'Unique identifier for the message'
    },
    fullName: {
        type: String,
        required: true,
        description: 'Full name of the contact'
    },
    email: {
        type: String,
        required: true,
        description: 'Email address of the contact'
    },
    phone: {
        type: String,
        required: true,
        description: 'Phone number of the contact'
    },
    subject: {
        type: String,
        required: true,
        description: 'Subject of the message'
    },
    comment: {
        type: String,
        required: true,
        description: 'Content of the message or comment'
    },
    status: {
        type: String,
        enum: ['unread', 'read'],
        required: true,
        description: 'Current status of the message'
    }
});

export const Contact = mongoose.model('Contact', ContactSchema);
