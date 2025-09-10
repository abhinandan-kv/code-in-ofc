import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

//yet to implement persistent storage feature.

const UserMessages = sequelize.define(
  "UserMessagesTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {                        //get this from token and call after each new messages 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    messages: {           
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);

try {
  await UserMessages.sync();
  console.log("Users synced succesfully");
} catch (err) {
  console.error(err);
}

export default UserMessages;
