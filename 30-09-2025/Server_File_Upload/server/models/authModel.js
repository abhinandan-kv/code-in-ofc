import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig.js";

const AuthTable = sequelize.define(
  "Auth_Table",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);

try {
  await AuthTable.sync();
  console.log("AuthTable SYNCED");
} catch (error) {
  console.log(error);
}

export default AuthTable;
