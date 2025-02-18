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
        required: true,
        description: 'Type of the room'
    },
    facilities: {
        type: String,
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
        type: String,
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
    description: {
        type: String,
        required: false,
        description: 'Description of the room'
    },
    offer: {
        type: String,
        required: false,
        description: 'Special offer for the room'
    },
    discount: {
        type: String,
        required: false,
        description: 'Discount applied to the room'
    },
    cancellationPolicy: {
        type: String,
        required: false,
        description: 'Cancellation policy for the room'
    },
    amenities: {
        type: [String],
        required: false,
        description: 'List of amenities in the room'
    },
    photos: {
        type: [String],
        required: false,
        description: 'Array of URLs of the room photos'
    }
});

export const Room = mongoose.model<RoomDocument>('Room', RoomSchema);