import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/database.js";
import User from "./dbUserModel.js";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productPrice: {
    type: DataTypes.INTEGER,
  },
});

Product.associate = () => {
  Product.hasMany(User, {
    foreignKey: "productId",
    as: "users",
  });
};

try {
  await Product.sync();
    console.log('\x1b[32m Synchronization Successful- Product Table \x1b[0m')      //\x1b is excape sequence [32m sets color to green [0m reset coloring
} catch (err) {
  console.error(err);
}

export default Product;
