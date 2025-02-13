import { AuthCredentials } from "../interfaces/authInterface";

export class AuthValidator {
    static validate(credentials: AuthCredentials): { valid: boolean; errors: string[] } {
        const errors: string[] = [];
        
        if (!credentials.username || credentials.username.trim() === "") {
            errors.push("Username is required.");
        }

        if (!credentials.password || credentials.password.trim() === "") {
            errors.push("Password is required.");
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (credentials.username && !emailRegex.test(credentials.username)) {
            errors.push("Username must be a valid email.");
        }

        return {
            valid: errors.length === 0,
            errors,
        };
    }
}
