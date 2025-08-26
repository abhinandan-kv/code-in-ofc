// id
// role    - user,  vendor, admin
// permissions

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const RolePermissionTable = sequelize.define(
  "RolePermissionTable",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);


try{
    await RolePermissionTable.sync()
    console.log("RolePermissiontable synced")
}catch(err){
    console.error(err)
}

export default RolePermissionTable