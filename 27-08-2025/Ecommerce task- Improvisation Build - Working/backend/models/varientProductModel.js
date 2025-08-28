import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import VendorProduct from "./vendorProduct.js";
import Category from "./categoryModel.js";

const VarientProduct = sequelize.define(
  "VarientProduct",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    //productId

    // productCategory
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stroage: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.STRING,
    },
    pattern: {
      type: DataTypes.STRING,
    },
  },
  { paranoid: true }
);


VarientProduct.hasMany(Category);
Category.belongsTo(VarientProduct);


// VendorProduct.hasMany(VarientProduct);
// VarientProduct.belongsTo(VendorProduct);


try {
  await VarientProduct.sync({ force: true });
  console.log("Varient Product Synced");
} catch (err) {
  console.error(err);
}

export default VarientProduct;
