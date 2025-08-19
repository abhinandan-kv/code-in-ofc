// Product Name
// Product Description
// Price
// Images
// Specifications
// Availability
// SKU (Stock Keeping Unit)
// Category and Subcategory
// Product Variations
// Ratings

import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/database.js";

const ProductTable = sequelize.define(
  "ProductTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coverImage: {                   //handle later
      type: DataTypes.BLOB("medium"),
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availableStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    specifications: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availability: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING, // like if their is a keyboard, category will be electronices and sub category will be keyboard/peripheral
    },
    subCategory: {
      type: DataTypes.STRING,
    },
    sku: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,          // will be added by user and handle if user has bought then only he can add ratings
    },
    productVendorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estimatedTimeToDeliverByVender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isReported:{
        type:DataTypes.BOOLEAN,
        defaultValue:false              //user can report a product and admin will respond to this
    }
  },
  { paranoid: true }
);

try {
  await ProductTable.sync();
  console.log("Product Table successfully");
} catch (err) {
  console.error(err);
}

export default ProductTable;
