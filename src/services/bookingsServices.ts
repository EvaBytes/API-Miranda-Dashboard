import { Booking} from "../interfaces/bookingsInterface";
import bookingData from "../data/bookings.json";

export class BookingsService {
    private bookings: Booking[] = bookingData as Booking[];

    fetchAll(): Booking[] {
        return this.bookings;
    }

    fetchById(reservationNumber: string): Booking | undefined {
        return this.bookings.find((booking) => booking.roomNumber === reservationNumber.toString());
    }

    create(booking: Booking): Booking {
        const newBooking = { ...booking, roomNumber: (this.bookings.length + 1).toString() };
        this.bookings.push(newBooking);
        return newBooking;
    }

    update(reservationNumber: string, booking: Booking): Booking | null {
        const bookingToUpdate = this.bookings.find((booking) => booking.roomNumber === reservationNumber.toString());
        if (bookingToUpdate) {
            const updatedBooking = { ...bookingToUpdate, ...booking };
            this.bookings = this.bookings.map((b) => (b.roomNumber === reservationNumber.toString() ? updatedBooking : b));
            return updatedBooking;
        }
        return null;
    }

    delete(reservationNumber: string): boolean {
        const bookingToDelete = this.bookings.find((booking) => booking.roomNumber === reservationNumber.toString());
        if (bookingToDelete) {
            this.bookings = this.bookings.filter((booking) => booking.roomNumber !== reservationNumber.toString());
            return true;
        }
        return false;
    }
}

export const getAllBookings = () => {const service = new BookingsService();return service.fetchAll();};
export const getBooking = (reservationNumber: string) => {const service = new BookingsService();return service.fetchById(reservationNumber);};
export const createBooking = (booking: Booking) => {const service = new BookingsService();return service.create(booking);};
export const updateBooking = (reservationNumber: string, booking: Booking) => {const service = new BookingsService();return service.update(reservationNumber, booking);};
export const deleteBooking = (reservationNumber: string) => {const service = new BookingsService();return service.delete(reservationNumber);};