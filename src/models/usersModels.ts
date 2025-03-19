import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db";
import { User } from "../interfaces/usersInterface";

class UserModel extends Model<User> implements User {
    public id!: number;
    public photo!: string;
    public name!: string;
    public employeeId!: string;
    public email!: string;
    public password!: string;
    public startDate!: string;
    public description!: string;
    public contact!: string;
    public status!: "ACTIVE" | "INACTIVE";
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        photo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        employeeId: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        contact: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
            allowNull: false,
            defaultValue: "ACTIVE",
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "Users",
        timestamps: false,
    }
);

export {UserModel};
