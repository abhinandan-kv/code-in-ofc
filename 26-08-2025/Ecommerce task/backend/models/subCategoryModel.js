import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Category from "./categoryModel.js";

const SubCategory = sequelize.define("SubCategory", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Category.hasMany(SubCategory, { foreignKey: "categoryId", onDelete: "CASCADE" });
SubCategory.belongsTo(Category, { foreignKey: "categoryId" });

try {
  await SubCategory.sync();
  console.log("SubCategory Table Synced");
} catch (err) {
  console.error(err);
}

export default SubCategory;
