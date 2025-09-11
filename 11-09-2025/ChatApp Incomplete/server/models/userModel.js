import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

//yet to implement login sign up feature.

const Users = sequelize.define(
  "UserTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
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
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    // ,
    // active:{          // not using anywhere currently - handle later
    //   type:DataTypes.BOOLEAN,
    //   defaultValue: false
    // }
  },
  { paranoid: true }
);

try {
  await Users.sync();
  console.log("Users synced succesfully");
} catch (err) {
  console.error(err);
}

export default Users;
