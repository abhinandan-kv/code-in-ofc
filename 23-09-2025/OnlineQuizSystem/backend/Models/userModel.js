import { DataTypes } from "sequelize";
import sequelize from "../Config/dbConfig.js";

const USERTABLE = sequelize.define(
  "USER_TABLE",
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
    phoneNumber: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.STRING,
      defaultValue: "false",
    },
  },
  { paranoid: true }
);

try {
  await USERTABLE.sync({alter: true});
  console.log("USERTABLE SYNCED");
} catch (error) {
  console.log(error);
}

export default USERTABLE;
