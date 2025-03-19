export interface User {
    id?: number;
    photo: string; 
    name: string;
    employeeId: string;
    email: string;
    password: string;
    startDate: string;
    description: string;
    contact: string;
    status: "ACTIVE" | "INACTIVE";
}
