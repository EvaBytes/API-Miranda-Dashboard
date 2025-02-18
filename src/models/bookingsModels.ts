import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true,
        description: 'URL of the main booking photo'
    },
    roomPhoto: {
        type: [String],
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
        required: true,
        description: 'Type of the booked room'
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
        enum: ['In Progress', 'Confirmed', 'Cancelled', 'Completed'],
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
            required: false,
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

module.exports = mongoose.model('Booking', BookingSchema);