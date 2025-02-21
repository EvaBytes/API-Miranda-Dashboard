import { Document } from 'mongoose';

export interface Guest extends Document {
    fullName: string;
    reservationNumber: string;
    image: string;
}

export interface BookingDocument extends Document {
    photo: string;
    roomPhoto: string | string[];
    roomNumber: string;
    roomType: "Single Bed" | "Double Bed" | "Double Bed Superior" | "Suite";
    facilities: string[];
    rate: string;
    offerPrice?: string;
    status: "Check-In" | "Check-Out" | "In Progress";
    guest: Guest;
    orderDate: string;
    checkIn: string;
    checkOut: string;
    specialRequest?: string;
}