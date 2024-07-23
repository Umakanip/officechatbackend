const { DataTypes, Model } = require("sequelize");
//const sequelize = require('../config/database');
import sequelize from "../models/index";
class Users extends Model {}
Users.init(
  {
    UserID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    PasswordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FirstName: {
      type: DataTypes.STRING,
    },
    LastName: {
      type: DataTypes.STRING,
    },
    ProfilePicture: {
      type: DataTypes.BLOB("long"),
    },
    Status: {
      type: DataTypes.STRING,
      defaultValue: "Offline",
    },
    LastSeen: {
      type: DataTypes.DATE,
    },
    IsMaster: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users", // Make sure this matches your table name exactly
    timestamps: false, // Disable timestamps (createdAt, updatedAt)
  }
);

export default Users;
