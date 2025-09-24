import AuthTable from "./AuthModel.js";
import StudentTable from "./studentModel.js";
import SubjectTable from "./subjectModel.js";

AuthTable.hasOne(StudentTable, { foreignKey: "authId" });
StudentTable.belongsTo(AuthTable, { foreignKey: "authId" });

StudentTable.belongsToMany(SubjectTable, { through: "StudentSubject" });
SubjectTable.belongsToMany(StudentTable, { through: "StudentSubject" });

export { AuthTable, StudentTable, SubjectTable };
