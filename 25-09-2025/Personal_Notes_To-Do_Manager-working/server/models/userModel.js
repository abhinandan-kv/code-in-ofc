import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig.js";

const userTable = sequelize.define(
  "User_Table",
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
    
  },
  { paranoid: true }
);

try {
  await userTable.sync();
  console.log("userTable SYNCED");
} catch (error) {
  console.log(error);
}

export default userTable;
