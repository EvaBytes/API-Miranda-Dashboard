export interface Guest {
    fullName: string;
    reservationNumber: string;
    image: string;
  }

  export interface Room {
    roomPhoto: string;
    roomNumber: string;
    roomType: string;
    facilities: string;
    rate: string;
    offerPrice: string;
    status: "Available" | "Booked" | "In Progress";
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
  