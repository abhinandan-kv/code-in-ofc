import NoteTable from "./noteModel.js";
import TodoTable from "./todoModel.js";
import userTable from "./userModel.js";

userTable.hasMany(TodoTable, { foreignKey: "userID" });
TodoTable.belongsTo(userTable, { foreignKey: "userID" });

userTable.hasMany(NoteTable, { foreignKey: "uid" });
NoteTable.belongsTo(userTable, { foreignKey: "uid" });

export { userTable, TodoTable, NoteTable };
