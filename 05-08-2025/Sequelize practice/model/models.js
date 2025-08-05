import sequelize from "./database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("useralot", { name: DataTypes.STRING }, { timestamps: false });
const Task = sequelize.define("taskalot", { name: DataTypes.STRING }, { timestamps: false });
const Tool = sequelize.define(
  "toolalot",
  {
    name: DataTypes.STRING,
    size: DataTypes.STRING,
  },
  { timestamps: false }
);
User.hasMany(Task);
Task.belongsTo(User);
User.hasMany(Tool, { as: "Instruments" });

try {
  await User.sync();
  await Task.sync();
  await Tool.sync();
} catch (err) {
  console.log(err);
}

export { User, Task, Tool };
