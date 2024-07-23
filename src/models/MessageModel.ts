const { DataTypes, Model } = require("sequelize");
//const sequelize = require('../config/database');
import sequelize from "../models/index";

class Messages extends Model {}
Messages.init(
  {
    MessageID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ChatID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Chats",
        key: "ChatID",
      },
    },
    SenderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "UserID",
      },
    },

    Content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    SentAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    IsPinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Messages",
    tableName: "Messages", // Make sure this matches your table name exactly
    timestamps: false, // Disable timestamps (createdAt, updatedAt)
  }
);
export default Messages;
