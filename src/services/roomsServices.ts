import { RoomModel } from "../models/roomsModels";  
import { Room } from "../interfaces/roomsInterface";

export class RoomsService {

    async fetchAll(): Promise<Room[]> {
        try {
            const rooms = await RoomModel.findAll();
            return rooms.map(room => room.toJSON() as Room);  
        } catch (error) {
            throw new Error('Error fetching rooms');
        }
    }

    async fetchById(roomId: string): Promise<Room | null> {
        try {
            const room = await RoomModel.findByPk(roomId);
            return room ? room.toJSON() as Room : null;  
        } catch (error) {
            throw new Error('Error fetching room by id');
        }
    }

    async create(roomData: Room): Promise<Room> {
        try {
            if (!roomData.roomNumber || roomData.roomNumber.trim() === "") {
                throw new Error('roomNumber is required and cannot be undefined or empty');
            }

            const existingRoom = await RoomModel.findOne({
                where: { roomNumber: roomData.roomNumber }
            });

            if (existingRoom) {
                throw new Error(`Room number "${roomData.roomNumber}" already exists`);
            }

            const finalRoomData: Room = {
                ...roomData,
                roomPhoto: roomData.roomPhoto ?? null,
                status: roomData.status ?? "Available",
            };

            const newRoom = await RoomModel.create(finalRoomData);
            return newRoom.toJSON() as Room;
        } catch (error) {
            throw new Error('Error creating room');
        }
    }

    async update(roomId: string, roomData: Partial<Room>): Promise<Room | null> {
        try {
            const [affectedRows, updatedRooms] = await RoomModel.update(roomData, {
                where: { id: roomId },
                returning: true,
            });

            if (affectedRows === 0) return null;  
            return updatedRooms[0].toJSON() as Room; 
        } catch (error) {
            throw new Error('Error updating room');
        }
    }

    async delete(roomId: string): Promise<boolean> {
        try {
            const deletedRows = await RoomModel.destroy({
                where: { id: roomId }
            });

            return deletedRows > 0; 
        } catch (error) {
            throw new Error('Error deleting room');
        }
    }
}

export const roomsService = new RoomsService();

export const fetchAllRooms = async () => roomsService.fetchAll();
export const fetchRoomById = async (roomId: string) => roomsService.fetchById(roomId);
export const createRoom = async (roomData: Room) => roomsService.create(roomData);
export const updateRoom = async (roomId: string, roomData: Partial<Room>) => roomsService.update(roomId, roomData);
export const deleteRoom = async (roomId: string) => roomsService.delete(roomId);
