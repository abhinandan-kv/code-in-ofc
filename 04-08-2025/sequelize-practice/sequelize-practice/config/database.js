import Sequelize from "sequelize";

const sequelize = new Sequelize("mydb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  await sequelize.authenticate();
  console.log("database connected successfully");
} catch (err) {
  console.error(err);
}

export default sequelize;
