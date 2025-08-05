import { Sequelize } from "sequelize";

const sequelize = new Sequelize("mydb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  await sequelize.authenticate();
  console.log("Seqielize connected");
} catch (err) {
  console.error(err);
}

export default sequelize
