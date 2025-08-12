import { DataTypes } from "sequelize";
import sequlize from "../config/database.js";

const RoleTable = sequlize.define(
  "RoleTable",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);

try {
  await RoleTable.sync();
  console.log("RoleTable Synced Successfully");
} catch (err) {
  console.error(err);
}

export default RoleTable;
