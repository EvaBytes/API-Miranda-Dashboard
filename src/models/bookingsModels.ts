import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/db'; 
import { RoomModel } from './roomsModels'; 

class BookingModel extends Model {
  public id!: number;
  public roomNumber!: number;
  public guest!: object;
  public rate!: number;
  public offerPrice!: number | null;
  public status!: string;
  public orderDate!: Date;
  public checkIn!: Date;
  public checkOut!: Date;
  public specialRequest!: string | null;
}

BookingModel.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    roomNumber: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: RoomModel,
        key: 'id',
      },
    },
    guest: {
      type: DataTypes.JSONB, 
      allowNull: false,
    },
    rate: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      validate: {
        min: 0,
        max: 1000,
      },
    },
    offerPrice: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
      validate: {
        min: 0,
        max: 1000,
      },
    },
    status: {
      type: DataTypes.ENUM('In-Progress', 'Check-in', 'Check-out'),
      allowNull: false,
      defaultValue: 'In-Progress',
    },
    orderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    checkIn: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    checkOut: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    specialRequest: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Booking',
    tableName: 'Bookings',
    timestamps: false, 
  }
);

BookingModel.belongsTo(RoomModel, {
  foreignKey: 'roomNumber',
  onDelete: 'CASCADE',
});

export { BookingModel };
