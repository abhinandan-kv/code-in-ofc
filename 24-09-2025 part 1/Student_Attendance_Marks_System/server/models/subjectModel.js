import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig.js";

const SubjectTable = sequelize.define(
  "SubjectTable",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);

try {
  await SubjectTable.sync({ alter: true });
  console.log("SubjectTable synced");
} catch (error) {
  console.log(error);
}

export default SubjectTable;
