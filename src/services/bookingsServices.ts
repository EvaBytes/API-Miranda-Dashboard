import { BookingModel } from "../models/bookingsModels";  
import { Booking } from "../interfaces/bookingsInterface";  

export class BookingsService {

    async fetchAll(): Promise<Booking[]> {
        try {
            const bookings = await BookingModel.findAll();
            return bookings.map(booking => booking.toJSON() as Booking);  
        } catch (error) {
            throw new Error('Error fetching bookings');
        }
    }

    async fetchById(bookingId: string): Promise<Booking | null> {
        try {
            const booking = await BookingModel.findByPk(bookingId);
            return booking ? booking.toJSON() as Booking : null;  
        } catch (error) {
            throw new Error('Error fetching booking by id');
        }
    }

    async create(bookingData: Partial<Booking>): Promise<Booking> {
        try {
            const newBooking = await BookingModel.create(bookingData);
            return newBooking.toJSON() as Booking;  
        } catch (error) {
            throw new Error('Error creating booking');
        }
    }

    async update(bookingId: string, bookingData: Partial<Booking>): Promise<Booking | null> {
        try {
            const [affectedRows, updatedBookings] = await BookingModel.update(bookingData, {
                where: { id: bookingId },
                returning: true,
            });

            if (affectedRows === 0) return null;  
            return updatedBookings[0].toJSON() as Booking;  
        } catch (error) {
            throw new Error('Error updating booking');
        }
    }

    async delete(bookingId: string): Promise<boolean> {
        try {
            const deletedRows = await BookingModel.destroy({
                where: { id: bookingId }
            });

            return deletedRows > 0;  
        } catch (error) {
            throw new Error('Error deleting booking');
        }
    }
}

export const bookingsService = new BookingsService();

export const fetchAllBookings = async () => bookingsService.fetchAll();
export const fetchBookingById = async (bookingId: string) => bookingsService.fetchById(bookingId);
export const createBooking = async (bookingData: Partial<Booking>) => bookingsService.create(bookingData);
export const updateBooking = async (bookingId: string, bookingData: Partial<Booking>) => bookingsService.update(bookingId, bookingData);
export const deleteBooking = async (bookingId: string) => bookingsService.delete(bookingId);
