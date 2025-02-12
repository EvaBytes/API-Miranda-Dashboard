import { Room } from "../interfaces/roomsInterface";
import roomData from "../data/Rooms.json";

class RoomService {
    private rooms: Room[] = roomData as Room[];

    fetchAll(): Room[] {
        return this.rooms;
    }

    fetchById(roomNumber: string): Room | undefined {
        return this.rooms.find((room) => room.roomNumber === roomNumber);
    }

    create(room: Room): Room {
        const newRoom = { ...room, roomNumber: (this.rooms.length + 1).toString() }; 
        this.rooms.push(newRoom);
        return newRoom;
    }

    update(roomNumber: string, room: Room): Room | null {
        const roomToUpdate = this.rooms.find((room) => room.roomNumber === roomNumber);
        if (roomToUpdate) {
            const updatedRoom = { ...roomToUpdate, ...room };
            this.rooms = this.rooms.map((r) => (r.roomNumber === roomNumber ? updatedRoom : r));
            return updatedRoom;
        }
        return null;
    }

    delete(roomNumber: string): boolean {
        const roomToDelete = this.rooms.find((room) => room.roomNumber === roomNumber);
        if (roomToDelete) {
            this.rooms = this.rooms.filter((room) => room.roomNumber !== roomNumber);
            return true;
        }
        return false;
    }
}

const service = new RoomService();

export const getAllRooms = () => service.fetchAll();
export const getRoom = (roomNumber: string) => service.fetchById(roomNumber);
export const createRoom = (room: Room) => service.create(room);
export const updateRoom = (roomNumber: string, room: Room) => service.update(roomNumber, room);
export const deleteRoom = (roomNumber: string) => service.delete(roomNumber);
