import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserVendorOrder = sequelize.define(
  "UserVendorOrderTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productUUID: {
      type: DataTypes.UUID,
    },
    productQualitity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    productTotalPrice: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    productEstimationTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentStatus: {
      type: DataTypes.ENUM("Pending", "Confirmed", "Packed", "Shipped", "Out For Delivery", "Delivered "),
      defaultValue: "Pending",
    },
    isDelivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { paranoid: true }
);

try {
  await UserVendorOrder.sync();
  console.log("UserVendorOrder synced");
} catch (err) {
  console.error(err);
}

export default UserVendorOrder;
