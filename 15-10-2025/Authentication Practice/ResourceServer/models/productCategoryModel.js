import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const productCategory = sequelize.define("productCategoryTable", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

try {
  await productCategory.sync();
  console.log("productCategory Synced");
} catch (error) {
  console.error(error);
}

export default productCategory;
