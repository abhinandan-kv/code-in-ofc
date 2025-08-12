import { DataTypes } from "sequelize";
import sequlize from "../config/database.js";

const UserRoleTable = sequlize.define(
  "UserRoleTable",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);

try {
  await UserRoleTable.sync();
  console.log("UserRoleTable Synced Successfully");
} catch (err) {
  console.error(err);
}

export default UserRoleTable;
