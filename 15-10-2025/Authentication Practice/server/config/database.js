import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
  host: process.env.host,
  dialect: process.env.dialect,
});

try {
  await sequelize.authenticate();
  console.log("Model authenticated");
} catch (err) {
  console.error(err);
}

export default sequelize;
