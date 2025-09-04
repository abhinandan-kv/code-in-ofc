import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserTable = sequelize.define(
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
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [8, 10],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull:false
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
  },
  {
    paranoid: true,
  }
);

try {
  await UserTable.sync();
  console.log("USERTABLE synced");
} catch (err) {
  console.error(err);
}

export default UserTable;
