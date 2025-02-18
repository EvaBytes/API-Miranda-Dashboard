import { Document } from 'mongoose';

export interface Guest extends Document {
    fullName: string;
    reservationNumber: string;
    image: string;
}

export interface RoomDocument extends Document {
  roomPhoto: string;
  roomNumber: string;
  roomType: string;
  facilities: string;
  rate: string;
  offerPrice: string;
  status: "Available" | "Booked" ;
  guest?: Guest; 
  orderDate?: string;
  checkIn?: string;
  checkOut?: string;
  description?: string;
  offer?: string;
  discount?: string;
  cancellationPolicy?: string;
  amenities?: string[];
  photos?: string[];
}