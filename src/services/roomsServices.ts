import { Room } from "../interfaces/roomsInterface";
import roomData from "../data/Rooms.json";

export class RoomService {
    private rooms: Room[] = roomData as Room[];

    fetchAll(): Room[] {
        return this.rooms;
    }

    fetchById(roomNumber: string ): Room | undefined {
        return this.rooms.find((room) => room.roomNumber === roomNumber.toString());
    }

    create(room: Room): Room {
        const newRoom = { ...room, roomNumber: (this.rooms.length + 1).toString() };
        this.rooms.push(newRoom);
        return newRoom;
    }

    update(roomNumber: string , room: Room): Room | null {
        const roomToUpdate = this.rooms.find((room) => room.roomNumber === roomNumber.toString());
        if (roomToUpdate) {
            const updatedRoom = { ...roomToUpdate, ...room };
            this.rooms = this.rooms.map((r) => (r.roomNumber === roomNumber.toString() ? updatedRoom : r));
            return updatedRoom;
        }
        return null;
    }

    delete(roomNumber: string ): boolean {
        const roomToDelete = this.rooms.find((room) => room.roomNumber === roomNumber.toString());
        if (roomToDelete) {
            this.rooms = this.rooms.filter((room) => room.roomNumber !== roomNumber.toString());
            return true;
        }
        return false;
    }
}

export const getAllRooms = () => {const service = new RoomService();return service.fetchAll();};
export const getRoom = (reservationNumber: string) => {const service = new RoomService();return service.fetchById(reservationNumber);};
export const createRoom = (room: Room) => {const service = new RoomService();return service.create(room);};
export const updateRoom = (roomNumber: string , room: Room) => {const service = new RoomService();return service.update(roomNumber, room);};
export const deleteRoom = (roomNumber:string) => {const service = new RoomService();return service.delete(roomNumber);};