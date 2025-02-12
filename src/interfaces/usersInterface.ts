export interface UserInterface {
        photo: string;
        name: string;
        employeeId: string;
        email: string;
        startDate:  string | number ;
        description: string;
        contact: string;
        status: "ACTIVE" | "INACTIVE"; 
}