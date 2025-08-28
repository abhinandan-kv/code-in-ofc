import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

try {
  await sequelize.authenticate();
  console.log("Sequelize Authenticated Successfully");
} catch (err) {
  console.error(err);
}

export default sequelize;
