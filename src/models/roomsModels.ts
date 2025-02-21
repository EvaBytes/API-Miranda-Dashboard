import mongoose from 'mongoose';
import { RoomDocument } from '../interfaces/roomsInterface'; 

const RoomSchema = new mongoose.Schema({
    roomPhoto: {
        type: String,
        required: true,
        description: 'URL of the room photo'
    },
    roomNumber: {
        type: String,
        required: true,
        unique: true,
        description: 'Unique identifier for the room'
    },
    roomType: {
        type: String,
        enum: ["Single Bed", "Double Bed","Double Bed Superior", "Suite"],
        required: true,
        description: 'Type of the room'
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
        enum: ['Available', 'Booked'],
        required: true,
        description: 'Current status of the room'
    },
    guest: {
        fullName: {
            type: String,
            required: false,
            description: 'Full name of the guest if booked'
        },
        reservationNumber: {
            type: String,
            required: false,
            description: 'Reservation number of the guest'
        },
        image: {
            type: String,
            required: false,
            description: 'Profile image of the guest'
        }
    },
    orderDate: {
        type: Date,
        required: false,
        description: 'Date and time of the room booking order'
    },
    checkIn: {
        type: String,
        required: false,
        description: 'Check-in date and time'
    },
    checkOut: {
        type: String,
        required: false,
        description: 'Check-out date and time'
    },
});

export const Room = mongoose.model<RoomDocument>('Room', RoomSchema);