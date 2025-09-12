import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Users from "./userModel.js";
import Group from "./group.js";

const UserMessages = sequelize.define("UserMessages", {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
   },
   from: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   to: {
      type: DataTypes.STRING,
      allowNull: true,
   },
   room: {
      type: DataTypes.STRING,
      allowNull: true,
   },
   groupId: {
      type: DataTypes.INTEGER,
   },
   content: {
      type: DataTypes.TEXT,
      allowNull: false,
   },
   time: {
      type: DataTypes.DATE,
      allowNull: false,
   },
});

Users.hasMany(UserMessages, { foreignKey: "from", sourceKey: "email" });
UserMessages.belongsTo(Users, { foreignKey: "from", targetKey: "email" });

Group.hasMany(UserMessages, { foreignKey: "groupId" });
UserMessages.belongsTo(Group, { foreignKey: "groupId" });

export default UserMessages;
