import AuthTable from "./AuthModel.js";
import FileTable from "./fileModel.js";

AuthTable.hasMany(FileTable, { foreignKey: "userId", onDelete: "CASCADE" });
FileTable.belongsTo(AuthTable, { foreignKey: "userId" });

export { AuthTable, FileTable };
