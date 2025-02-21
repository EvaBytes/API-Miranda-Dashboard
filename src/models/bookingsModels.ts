import mongoose from 'mongoose';
import { BookingDocument } from '../interfaces/bookingsInterface'; 

const BookingSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true,
        description: 'URL of the main booking photo'
    },
    roomPhoto: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        description: 'Array of URLs of the room photos'
    },
    roomNumber: {
        type: String,
        required: true,
        unique: true,
        description: 'Unique identifier for the booked room'
    },
    roomType: {
        type: String,
        enum: ["Single Bed", "Double Bed","Double Bed Superior", "Suite"],
        required: true,
        description: 'Type of the booked room'
    },
    facilities: {
        type: [String],
        enum: ["Air conditioner","High speed WiFi","Breakfast","Kitchen","Cleaning","Shower","Grocery","Single bed","Shop near","Towels","24/7 Online Support","Strong locker","Smart Security","Expert Team"],
        required: true,
        description: 'List of facilities available in the room'
    },
    rate: {
        type: String,
        required: true,
        description: 'Standard rate of the room'
    },
    offerPrice: {
        type: String,
        required: false,
        description: 'Discounted price if any'
    },
    status: {
        type: String,
        enum: ['Check-In', 'Check-Out', 'In Progress'],
        required: true,
        description: 'Current booking status'
    },
    guest: {
        fullName: {
            type: String,
            required: true,
            description: 'Full name of the guest who made the booking'
        },
        reservationNumber: {
            type: String,
            required: true,
            unique: true,
            description: 'Reservation number of the booking'
        },
        image: {
            type: String,
            required: true,
            description: 'Profile image of the guest'
        }
    },
    orderDate: {
        type: String,
        required: true,
        description: 'Date and time when the booking was placed'
    },
    checkIn: {
        type: String,
        required: true,
        description: 'Check-in date of the booking'
    },
    checkOut: {
        type: String,
        required: true,
        description: 'Check-out date of the booking'
    },
    specialRequest: {
        type: String,
        required: false,
        description: 'Special requests made by the guest'
    }
});

export const Booking = mongoose.model<BookingDocument>('Booking', BookingSchema);