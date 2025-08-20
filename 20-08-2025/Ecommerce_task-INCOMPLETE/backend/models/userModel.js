//user will have following columns

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

//id (unique)
//name
//email (unique)
//phonenumber (unique)
//password

//role
//isActive
//approvedBy (handle admin name here with string template)
//

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
    dob: {
      type: DataTypes.DATEONLY, //YYYY-MM-DD
    },
    profilePic: {
      //handle later
      type: DataTypes.STRING, //this can be changed by user after signup approval from admin(that is successfull account creation) not good practice to give unneccsary stroage can be spammed
    },
    role: {
      type: DataTypes.ENUM("admin", "vendor", "user"),
      defaultValue: "user",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    approvedBy: {
      type: DataTypes.STRING,
      defaultValue: "Yet to Approve", // then admin name should get changed
    },
    is2Fa: {
      type: DataTypes.STRING, // reason this is a string becz can extend in future to add recovery option too
      defaultValue: "false",
    },
    references: {
      type: DataTypes.STRING,
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
