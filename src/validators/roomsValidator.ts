import { RoomDocument } from "../interfaces/roomsInterface";

class RoomValidator {
  validate(room: RoomDocument): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!room.roomPhoto || typeof room.roomPhoto !== "string" || room.roomPhoto.trim() === "") {
      errors.push("Room photo is required and must be a non-empty string.");
    }

    if (!room.roomNumber || typeof room.roomNumber !== "string" || room.roomNumber.trim() === "") {
      errors.push("Room number must be a valid non-empty string.");
    }

    if (!room.roomType || typeof room.roomType !== "string" || room.roomType.trim() === "") {
      errors.push("Room type must be a valid non-empty string.");
    }

    if (!room.facilities || !Array.isArray(room.facilities) || room.facilities.length === 0) {
      errors.push("Facilities must be a valid non-empty string.");
    }

    if (!room.rate || isNaN(parseFloat(room.rate))) {
      errors.push("Rate must be a valid number.");
    }

    if (!room.offerPrice || isNaN(parseFloat(room.offerPrice))) {
      errors.push("Offer price must be a valid number.");
    }

    if (!room.status || !["Available", "Booked"].includes(room.status)) {
      errors.push("Room status must be 'Available'or 'Booked'.");
    }

    if (room.checkIn && isNaN(new Date(room.checkIn).getTime())) {
      errors.push("Check-in date must be a valid date.");
    }

    if (room.checkOut && isNaN(new Date(room.checkOut).getTime())) {
      errors.push("Check-out date must be a valid date.");
    }

    if (room.orderDate && isNaN(new Date(room.orderDate).getTime())) {
      errors.push("Order date must be a valid date.");
    }

    if (room.checkIn && room.checkOut && new Date(room.checkIn) >= new Date(room.checkOut)) {
      errors.push("Check-in date must be before check-out date.");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export default RoomValidator;
