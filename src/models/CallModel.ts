import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './dbconfig';

interface CallsAttributes {
  CallID: number;
  CallerID: number;
  ReceiverID: number;
  GroupID?: number | null;
  StartTime: Date;
  EndTime?: Date | null;
  CallType: string; // e.g., 'audio' or 'video'
  ScreenShared: boolean;
}

interface CallsCreationAttributes extends Optional<CallsAttributes, 'CallID'> {}

class Calls extends Model<CallsAttributes, CallsCreationAttributes> implements CallsAttributes {
  public CallID!: number;
  public CallerID!: number;
  public ReceiverID!: number;
  public GroupID!: number | null;
  public StartTime!: Date;
  public EndTime!: Date | null;
  public CallType!: string;
  public ScreenShared!: boolean;
}

Calls.init(
  {
    CallID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CallerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'UserID',
      },
    },
    ReceiverID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'UserID',
      },
    },
    GroupID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Groups',
        key: 'GroupID',
      },
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
  },
  {
    sequelize,
    modelName: 'Calls',
    tableName: 'Calls',
    timestamps: false,
  }
);

export default Calls;
