import { Document } from 'mongoose';

export interface Guest extends Document {
    fullName: string;
    reservationNumber: string;
    image: string;
}

export interface RoomDocument extends Document {
  roomPhoto: string;
  roomNumber: string;
  roomType: "Single Bed" | "Double Bed" | "Double Bed Superior" | "Suite";
  facilities: string[];
  rate: string;
  offerPrice?: string;
  status: "Available" | "Booked" ;
  guest?: Guest; 
  orderDate?: string;
  checkIn?: string;
  checkOut?: string;
}