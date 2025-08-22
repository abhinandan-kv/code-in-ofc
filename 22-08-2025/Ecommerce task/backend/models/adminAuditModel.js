// id
// user that triggered it
// event name
// event description
// timestamp of the event

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

//simply make a utility funciton and run everytime you need to add the logs to the audit table and use the get the data/log data from parameters

const AdminAuditModel = sequelize.define(
  "AdminAuditTable",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    performedBy: {
      // here this can be extended in future if you want to use this audit table for all logs by all users, here rightnow we are going to use only admin
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);

try {
  await AdminAuditModel.sync();
  console.log("adminAuditModel synced");
} catch (err) {
  console.error(err);
}

export default AdminAuditModel;
