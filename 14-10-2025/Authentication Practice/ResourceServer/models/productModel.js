import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

//yet to implement login sign up feature.

const Product = sequelize.define(
  "ProductTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);

try {
  await Product.sync();
  console.log("ProductTable synced succesfully");
} catch (err) {
  console.error(err);
}

export default Product;
