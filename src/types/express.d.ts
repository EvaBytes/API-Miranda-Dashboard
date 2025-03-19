import { UserModel } from '../models/usersModels';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                name: string;
            };
        }
    }
}
