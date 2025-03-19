import { sequelize } from "../database/db";
import { Model, DataTypes } from "sequelize";
import { Message } from "../interfaces/contactInterface";

class MessageModel extends Model<Message> implements Message {
    public messageId!: number;
    public photo!: string;
    public date!: string;
    public fullName!: string;
    public email!: string;
    public phone!: string;
    public subject!: string;
    public comment!: string;
    public status!: "unread" | "read";
}

MessageModel.init({
    messageId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    photo: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,  
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING(75),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(15),  
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('unread', 'read'),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Message",
    tableName: "Contact",  
    timestamps: false,
});

export { MessageModel };
