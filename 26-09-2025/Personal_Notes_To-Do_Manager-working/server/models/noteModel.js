import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig.js";

const NoteTable = sequelize.define(
  "NoteTable",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uid: {
      type: DataTypes.INTEGER,
    },
  },
  { paranoid: true }
);

try {
  await NoteTable.sync();
  console.log("NoteTable Synced");
} catch (error) {
  console.error(error);
}

export default NoteTable;
