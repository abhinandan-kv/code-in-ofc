import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./userModel.js";


const product = await sequelize.define("productTable", {
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
  price: {
    type: DataTypes.INTEGER,
  },
});



try {
  product.sync();
} catch (err) {
  consol.log(err);
}

export default product;
