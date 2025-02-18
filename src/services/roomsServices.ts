import { Room } from '../models/roomsModels'; 
import { RoomDocument } from '../interfaces/roomsInterface'; 

export class RoomService {
    static async fetchAll(): Promise<RoomDocument[]> {
        return await Room.find(); 
    }

    static async fetchById(roomNumber: string): Promise<RoomDocument | null> {
        return await Room.findOne({ roomNumber }); 
    }

    static async create(roomData: RoomDocument): Promise<RoomDocument> {
        const newRoom = new Room(roomData);
        return await newRoom.save(); 
    }

    static async update(roomNumber: string, roomData: Partial<RoomDocument>): Promise<RoomDocument | null> {
        return await Room.findOneAndUpdate(
            { roomNumber },
            roomData,
            { new: true }
        ); 
    }

    static async delete(roomNumber: string): Promise<boolean> {
        const result = await Room.deleteOne({ roomNumber });
        return result.deletedCount > 0;
    }
}

export const getAllRooms = RoomService.fetchAll;
export const getRoom = RoomService.fetchById;
export const createRoom = RoomService.create;
export const updateRoom = RoomService.update;
export const deleteRoom = RoomService.delete;