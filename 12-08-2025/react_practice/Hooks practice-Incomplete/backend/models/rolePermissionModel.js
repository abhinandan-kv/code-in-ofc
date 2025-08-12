import { DataTypes } from "sequelize";
import sequlize from "../config/database.js";

const RolePermissionTable = sequlize.define(
  "RolePermissionTable",
  {
    role_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);

try {
  await RolePermissionTable.sync();
  console.log("RolePermissionTable Synced Successfully");
} catch (err) {
  console.error(err);
}

export default RolePermissionTable;
