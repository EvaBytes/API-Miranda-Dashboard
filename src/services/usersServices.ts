import bcrypt from "bcryptjs";
import {UserModel} from "../models/usersModels";
import { User } from "../interfaces/usersInterface";

export class UserService {
    async fetchAll(): Promise<User[]> {
        try {
            return await UserModel.findAll({
                attributes: ["id", "photo", "name", "employeeId", "email", "startDate", "description", "contact", "status"],
            });
        } catch (error) {
            throw new Error("Error fetching users");
        }
    }

    async fetchById(employeeId: string): Promise<User | null> {
        try {
            return await UserModel.findOne({
                where: { employeeId },
                attributes: ["id", "photo", "name", "employeeId", "email", "startDate", "description", "contact", "status"],
            });
        } catch (error) {
            throw new Error("Error fetching user by id");
        }
    }

    async create(userData: User): Promise<User> {
        try {
            const hashedPassword = bcrypt.hashSync(userData.password, 15);
            const newUser = await UserModel.create({ ...userData, password: hashedPassword });
            return newUser;
        } catch (error) {
            throw new Error("Error creating user");
        }
    }

    async update(employeeId: string, userData: Partial<User>): Promise<User | null> {
        try {
            if (userData.password) {
                userData.password = bcrypt.hashSync(userData.password, 15);
            }

            const [updated] = await UserModel.update(userData, { where: { employeeId }, returning: true });

            if (updated === 0) return null;

            return await this.fetchById(employeeId);
        } catch (error) {
            throw new Error("Error updating user");
        }
    }

    async delete(employeeId: string): Promise<boolean> {
        try {
            const deletedRows = await UserModel.destroy({ where: { employeeId } });
            return deletedRows > 0;
        } catch (error) {
            throw new Error("Error deleting user");
        }
    }
}

export const userService = new UserService();
export const fetchAllUsers = async () => userService.fetchAll();
export const fetchUserById = async (employeeId: string) => userService.fetchById(employeeId);
export const createUser = async (userData: User) => userService.create(userData);
export const updateUser = async (employeeId: string, userData: Partial<User>) => userService.update(employeeId, userData);
export const deleteUser = async (employeeId: string) => userService.delete(employeeId);
