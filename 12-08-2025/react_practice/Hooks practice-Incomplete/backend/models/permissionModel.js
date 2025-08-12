import { DataTypes } from "sequelize";
import sequlize from "../config/database.js";

const PermissionTable = sequlize.define(
  "PermissionTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement:true,
    },
    permission_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);

try {
  await PermissionTable.sync();
  console.log("PermissionTable Synced Successfully");
} catch (err) {
  console.error(err);
}

export default PermissionTable;
