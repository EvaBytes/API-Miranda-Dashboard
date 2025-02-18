import { Document } from 'mongoose';

export interface Guest extends Document {
    fullName: string;
    reservationNumber: string;
    image: string;
}

export interface BookingDocument extends Document {
    photo: string;
    roomPhoto: string[];
    roomNumber: string;
    roomType: string;
    facilities: string;
    rate: string;
    offerPrice?: string;
    status: "Check-In" | "Check-Out" | "In Progress";
    guest: Guest;
    orderDate: string;
    checkIn: string;
    checkOut: string;
    specialRequest?: string;
}