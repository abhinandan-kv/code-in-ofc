import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserTable = sequelize.define(
  "UserTable",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);

try {
  await UserTable.sync();
  console.log("User table sucessfully synced");
} catch (err) {
  console.error(err);
}

export default UserTable;
