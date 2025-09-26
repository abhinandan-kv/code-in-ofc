import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.db_Name, process.env.db_User, process.env.db_PW, {
  dialect: process.env.db_Dialect,
  host: process.env.db_Host,
});

try {
  await sequelize.authenticate();
  console.log("sequelize authenticated");
} catch (err) {
  console.error(err);
}

export default sequelize;
