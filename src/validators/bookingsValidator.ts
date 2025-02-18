import { BookingDocument } from "../interfaces/bookingsInterface";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export class BookingValidator {
    validate(booking: BookingDocument): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!booking.guest || !booking.guest.fullName || !booking.guest.reservationNumber) {
            errors.push("Guest must have a full name and a reservation number.");
        }

        if (!booking.roomNumber || typeof booking.roomNumber !== "string" || booking.roomNumber.trim() === "") {
            errors.push("Room number must be a valid string.");
        }

        if (!booking.roomType || typeof booking.roomType !== "string" || booking.roomType.trim() === "") {
            errors.push("Room type must be a valid string.");
        }

        if (!booking.status || !["Check-In", "Check-Out", "In Progress"].includes(booking.status)) {
            errors.push("Status must be 'Check-In', 'Check-Out', or 'In Progress'.");
        }

        if (!dateRegex.test(booking.checkIn) || !dateRegex.test(booking.checkOut)) {
            errors.push("Check-in and check-out dates must be in 'YYYY-MM-DD' format.");
        }

        const orderDate = new Date(booking.orderDate);
        const checkInDate = new Date(booking.checkIn);
        const checkOutDate = new Date(booking.checkOut);

        if (isNaN(orderDate.getTime()) || isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
            errors.push("Dates must be valid.");
        }

        if (checkInDate >= checkOutDate) {
            errors.push("Check-in date must be before check-out date.");
        }

        if (orderDate > checkInDate) {
            errors.push("Order date cannot be later than check-in date.");
        }

        return {
            valid: errors.length === 0,
            errors,
        };
    }
}
