import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserBookTable = sequelize.define(
  "UserBookTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    bookId: {
      // this should be auto filled
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    bookPublicationName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    userId: {
      // this should also be auto filled
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    issueDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    dueDate: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    returned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    paranoid: true,
  }
);

try {
  await UserTable.sync();
  console.log("UserBookTable synced");
} catch (err) {
  console.error(err);
}

export default UserBookTable;
