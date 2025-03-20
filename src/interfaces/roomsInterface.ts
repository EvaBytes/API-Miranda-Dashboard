export interface Room {
  id?: number;                        
  roomPhoto?: string | null;                  
  roomNumber: string;                 
  roomType: "Single Bed" | "Double Bed" | "Double Bed Superior" | "Suite"; 
  facilities: string;  
  rate: string;                       
  offerPrice?: string | null;               
  status: "Available" | "Booked";     
}
