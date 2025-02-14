import { UserInterface } from "../interfaces/usersInterface";
import usersData from "../data/Users.json";

export class UsersService {
    private users: UserInterface[] = usersData as UserInterface[];


    fetchAll(): UserInterface[] {
        return this.users;
    }

    fetchById(employeeId: string): UserInterface | undefined {
        return this.users.find((user) => user.employeeId === employeeId);
    }

    create(user: UserInterface): UserInterface {
        const newUser = { ...user, employeeId: (this.users.length + 1).toString() };
        this.users.push(newUser);
        return newUser;
    }

    update(employeeId: string, user: UserInterface): UserInterface | null {
        const userToUpdate = this.users.find((user) => user.employeeId === employeeId);
        if (userToUpdate) {
            const updatedUser = { ...userToUpdate, ...user };
            this.users = this.users.map((u) => (u.employeeId === employeeId ? updatedUser : u));
            return updatedUser;
        }
        return null;
    }

    delete(employeeId: string): boolean {
        const userToDelete = this.users.find((user) => user.employeeId === employeeId);
        if (userToDelete) {
            this.users = this.users.filter((user) => user.employeeId !== employeeId);
            return true;
        }
        return false;
    }
}

export const getAllUsers = () => {const service = new UsersService();return service.fetchAll();};
export const getUser = (employeeId: string) => {const service = new UsersService();return service.fetchById(employeeId);};
export const createUser = (user: UserInterface) => {const service = new UsersService();return service.create(user);};
export const updateUser = (employeeId: string, user: UserInterface) => {const service = new UsersService();return service.update(employeeId,user);};
export const deleteUser = (employeeId: string) => {const service = new UsersService();return service.delete(employeeId);};