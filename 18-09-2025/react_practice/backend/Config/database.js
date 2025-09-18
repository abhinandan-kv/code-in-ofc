import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
});

try {
  await sequelize.authenticate();
  console.log("Sequelize Authenticated");
} catch (err) {
  console.error(err);
}

export default sequelize;

//dbname,user, pw, dialect, host
