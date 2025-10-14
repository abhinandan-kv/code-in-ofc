import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const productSubCategory = sequelize.define("productSubCategoryTable", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  subCategoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

try {
  await productSubCategory.sync();
  console.log("productSubCategory Synced");
} catch (error) {
  console.error(error);
}

export default productSubCategory;
