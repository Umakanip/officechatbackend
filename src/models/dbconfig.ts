import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize("chatapp", "mssqldb", "mssqldb@123", {
  host: "localhost",
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: true, // Use this if you're on Windows Azure
      trustServerCertificate: true, // Use this for self-signed certificates
    },
  },
});

export default sequelize;
