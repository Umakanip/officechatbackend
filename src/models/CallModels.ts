import { DataTypes, Model } from 'sequelize';
import sequelize from '../models/index';

class Call extends Model {}

Call.init({
  CallID: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  CallerID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ReceiverID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  GroupID: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  StartTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  EndTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  CallType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ScreenShared: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Call',
  tableName: 'Calls', // Ensure this matches your table name exactly
  timestamps: false, // Disable timestamps (createdAt, updatedAt)
});

export default Call;
