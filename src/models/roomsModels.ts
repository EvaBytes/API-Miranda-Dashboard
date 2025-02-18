import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    roomPhoto: {
        type: String,
        required: true,
        description: 'URL of the rooms photo'
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
        description: 'Type of room (e.g., Single, Double Bed Superior)'
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
        enum: ['Available', 'Booked', 'Occupied', 'Maintenance'],
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
    }
});

module.exports = mongoose.model('Room', RoomSchema);
