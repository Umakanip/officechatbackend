const { DataTypes, Model } = require("sequelize");
//const sequelize = require('../config/database');
import sequelize from "../models/index";

class Chats extends Model {}
Chats.init(
  {
    ChatID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    User1ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "UserID",
      },
    },
    User2ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "UserID",
      },
    },
    GroupID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Groups",
        key: "GroupID",
      },
    },

    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Chats",
    tableName: "Chats", // Make sure this matches your table name exactly
    timestamps: false, // Disable timestamps (createdAt, updatedAt)
  }
);
export default Chats;
