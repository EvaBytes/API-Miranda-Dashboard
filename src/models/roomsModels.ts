import { sequelize } from "../database/db";
import { Model, DataTypes } from "sequelize";
import { Room } from "../interfaces/roomsInterface";

class RoomModel extends Model {
    public id!: number;
    public roomPhoto?: string | null;
    public roomNumber!: string;
    public roomType!: "Single Bed" | "Double Bed" | "Double Bed Superior" | "Suite";
    public facilities!: string;
    public rate!: string;
    public offerPrice?: string | null;
    public status!: "Available" | "Booked";
}

RoomModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    roomPhoto: {
        type: DataTypes.STRING,
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
    }
}, {
    sequelize,
    modelName: "Room",
    tableName: "Rooms",
    timestamps: false,
});

export { RoomModel };
