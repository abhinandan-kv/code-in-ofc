import Users from "./userModel.js";
import Group from "./group.js";
import GroupMember from "./groupMember.js";
import UserMessages from "./userMessages.js";

Users.hasMany(GroupMember, { foreignKey: "userId" });
GroupMember.belongsTo(Users, { foreignKey: "userId", as: "user" });  

Group.hasMany(GroupMember, { foreignKey: "groupId" });
GroupMember.belongsTo(Group, { foreignKey: "groupId" });

Users.hasMany(UserMessages, { foreignKey: "from" });
UserMessages.belongsTo(Users, { foreignKey: "from" });

Group.hasMany(UserMessages, { foreignKey: "groupId" });
UserMessages.belongsTo(Group, { foreignKey: "groupId" });

export { Users, Group, GroupMember, UserMessages };

// put all associations here next time and keep filename like that