import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserProductCart = sequelize.define("UserProductCart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER, // <-- VendorProduct Id basically
    allowNull: false,
  },
});

try {
  await UserProductCart.sync();
  console.log("UserProductCart Successfully Synced");
} catch (err) {
  console.error(err);
}

export default UserProductCart;
