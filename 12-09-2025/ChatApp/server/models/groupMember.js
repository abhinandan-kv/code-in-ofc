import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Users from "./userModel.js";
import Group from "./group.js";

const GroupMember = sequelize.define("GroupMember", {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   role: { type: DataTypes.STRING, defaultValue: "member" },
});

Users.belongsToMany(Group, { through: GroupMember, foreignKey: "userId" });
Group.belongsToMany(Users, { through: GroupMember, foreignKey: "groupId" });

export default GroupMember;
