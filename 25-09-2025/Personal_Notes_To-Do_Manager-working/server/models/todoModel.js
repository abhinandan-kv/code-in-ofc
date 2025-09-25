import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig.js";

const TodoTable = sequelize.define(
  "Todo_Table",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,

      defaultValue: false,
    },
    color: {
      type: DataTypes.STRING,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
  },
  { paranoid: true }
);

try {
  await TodoTable.sync();
  console.log("TodoTable synced");
} catch (error) {
  console.error(error);
}

export default TodoTable;
