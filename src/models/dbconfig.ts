import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: true, // Use this if you're on Windows Azure
      trustServerCertificate: true, // Use this for self-signed certificates
    },
  },
});

export default sequelize;
