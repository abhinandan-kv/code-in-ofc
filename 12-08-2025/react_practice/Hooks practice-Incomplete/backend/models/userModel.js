import { DataTypes } from "sequelize";
import sequlize from "../config/database.js";

const UserTable = sequlize.define(
  "UserTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
      allowNull: false,
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
  console.log("UserTable Synced Successfully");
} catch (err) {
  console.error(err);
}

export default UserTable;
