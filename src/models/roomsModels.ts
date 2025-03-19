import { sequelize } from "../database/db";
import { Model, DataTypes } from "sequelize";
import { Room } from "../interfaces/roomsInterface";

class RoomModel extends Model<Room> implements Room {
    public id!: number;
    public roomPhoto!: string;
    public roomNumber!: string;
    public roomType!: "Single Bed" | "Double Bed" | "Double Bed Superior" | "Suite";
    public facilities!: string;  
    public rate!: string;
    public offerPrice?: string | null;
    public status!: "Available" | "Booked";
    public guest?: string | null;  
    public orderDate?: string;  
    public checkIn?: string;    
    public checkOut?: string;   
}

RoomModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    roomPhoto: {
        type: DataTypes.STRING(255),  
        allowNull: true,
    },
    roomNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    roomType: {
        type: DataTypes.ENUM('Single Bed', 'Double Bed', 'Double Bed Superior', 'Suite'),
        allowNull: false,
    },
    facilities: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    rate: {
        type: DataTypes.STRING,  
        allowNull: false,
    },
    offerPrice: {
        type: DataTypes.STRING,  
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('Available', 'Booked'),
        allowNull: false,
    },
    guest: {
        type: DataTypes.STRING,  
        allowNull: true,
    },
    orderDate: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    checkIn: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    checkOut: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
}, {
    sequelize, 
    modelName: "Room", 
    tableName: "Rooms", 
    timestamps: false,
});

export { RoomModel };
