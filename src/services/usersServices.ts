import bcrypt from 'bcryptjs';
import { User } from '../models/usersModels';
import { UserDocument } from '../interfaces/usersInterface';

export class UsersService {
    static async fetchAll(): Promise<UserDocument[]> {
        return await User.find(); 
    }

    static async fetchById(employeeId: string): Promise<UserDocument | null> {
        return await User.findOne({ employeeId });
    }

    static async create(userData: UserDocument): Promise<UserDocument> {
        try {
            const hashedPassword = bcrypt.hashSync(userData.password, 15); 
            const newUser = new User({
                ...userData,
                password: hashedPassword
            });

            return await newUser.save();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error('Error creating user: ' + error.message);
            } else {
                throw new Error('Unknown error occurred during user creation');
            }
        }
    }

    static async update(employeeId: string, userData: Partial<UserDocument>): Promise<UserDocument | null> {
        return await User.findOneAndUpdate(
            { employeeId },
            userData,
            { new: true }
        ); 
    }

    static async delete(employeeId: string): Promise<boolean> {
        const result = await User.deleteOne({ employeeId });
        return result.deletedCount > 0;
    }
}

export const getAllUsers = UsersService.fetchAll;
export const getUser = UsersService.fetchById;
export const createUser = UsersService.create;
export const updateUser = UsersService.update;
export const deleteUser = UsersService.delete;
