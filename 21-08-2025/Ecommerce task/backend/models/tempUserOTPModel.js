import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const tempUserTable = sequelize.define("tempUserTable",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

try {
  await tempUserTable.sync();
  console.log("tempUserTable synced");
} catch (err) {
  console.error(err);
}

export default tempUserTable;
