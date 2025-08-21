import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AuditLog = sequelize.define(
  "AuditLogTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UUID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    operationPerformedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    operationPerformed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rowsAffectedByThat: {
      type: DataTypes.INTEGER,
    },
  },
  { paranoid: true }
);

try {
  await AuditLog.sync();
  console.log("AuditLog synced");
} catch (err) {
  console.error(err);
}

export default AuditLog;
