import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig.js";
import AuthTable from "./AuthModel.js";

const StudentTable = sequelize.define(
  "StudentTable",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    attendence: {
      type: DataTypes.BOOLEAN,
    },
    totalAttendence: {
      type: DataTypes.STRING,
    },
    totalPercentage: {
      type: DataTypes.STRING,
    },
    authId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: AuthTable,
        key: "id",
      },
    },
  },
  { paranoid: true }
);

try {
  await StudentTable.sync();
  console.log("StudentTable synced");
} catch (error) {
  console.error(error);
}

export default StudentTable;
