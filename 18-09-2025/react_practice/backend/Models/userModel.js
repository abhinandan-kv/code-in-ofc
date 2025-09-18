import { DataTypes } from "sequelize";
import sequelize from "../Config/database.js";

const User = sequelize.define(
  "UserAuthTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
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
    phoneNo: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    twoFactorAuth: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    MFA: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
  },
  { paranoid: true }
);

try {
  await User.sync();
  console.log("User table synced");
} catch (err) {
  console.error(err);
}

export default User;
