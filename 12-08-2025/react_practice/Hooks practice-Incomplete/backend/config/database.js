import Sequelize from "sequelize";

const sequlize = new Sequelize("practicedb", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

try {
  await sequlize.authenticate();
  console.log("Database Authenticated Succesfully");
} catch (err) {
  console.error(err);
}

export default sequlize;
