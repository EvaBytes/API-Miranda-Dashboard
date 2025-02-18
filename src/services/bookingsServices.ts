import { Booking } from '../models/bookingsModels'; 
import { BookingDocument } from '../interfaces/bookingsInterface'; 

export class BookingsService {
    static async fetchAll(): Promise<BookingDocument[]> {
        return await Booking.find(); 
    }

    static async fetchById(reservationNumber: string): Promise<BookingDocument | null> {
        return await Booking.findOne({ 'guest.reservationNumber': reservationNumber }); 
    }

    static async create(bookingData: BookingDocument): Promise<BookingDocument> {
        const newBooking = new Booking(bookingData);
        return await newBooking.save(); 
    }

    static async update(reservationNumber: string, bookingData: Partial<BookingDocument>): Promise<BookingDocument | null> {
        return await Booking.findOneAndUpdate(
            { 'guest.reservationNumber': reservationNumber }, 
            bookingData, 
            { new: true } 
        ); 
    }

    static async delete(reservationNumber: string): Promise<boolean> {
        const result = await Booking.deleteOne({ 'guest.reservationNumber': reservationNumber }); 
        return result.deletedCount > 0; 
    }
}

export const getAllBookings = BookingsService.fetchAll;
export const getBooking = BookingsService.fetchById;
export const createBooking = BookingsService.create;
export const updateBooking = BookingsService.update;
export const deleteBooking = BookingsService.delete;