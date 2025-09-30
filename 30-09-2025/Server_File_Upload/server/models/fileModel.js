import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig.js";
import AuthTable from "./AuthModel.js";

const FileTable = sequelize.define(
  "FileTable",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fileName: {
      type: DataTypes.STRING,
    },
    filePath: {
      type: DataTypes.STRING,
    },
    mimeType: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: AuthTable,
        key: "id",
      },
    },
  },
  { paranoid: true }
);

try {
  await FileTable.sync();
  console.log("FileTable synced");
} catch (error) {
  console.error(error);
}

export default FileTable;
