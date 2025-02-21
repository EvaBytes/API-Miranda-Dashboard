import { AuthCredentials } from "../interfaces/authInterface";

export class AuthValidator {
    static validate(credentials: AuthCredentials): { valid: boolean; errors: string[] } {
        const errors: string[] = [];
        
        if (!credentials.email || credentials.email.trim() === "") {
            errors.push("Valid email is required.");
        }

        if (!credentials.password || credentials.password.trim() === "") {
            errors.push("Password is required.");
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (credentials.email && !emailRegex.test(credentials.email)) {
            errors.push("User must be a valid email.");
        }

        return {
            valid: errors.length === 0,
            errors,
        };
    }
}
