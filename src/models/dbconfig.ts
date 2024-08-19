import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize("officechat", "JananiR", "Janani1299", {
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