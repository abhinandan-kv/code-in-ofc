import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import product from "./productModel.js";

const User = await sequelize.define(
  "UserTable",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
    },
  },
  { tableName: "UserTable" }
);

// User.hasMany(product, {
//   foreignKey: "userId",
// });
// product.belongsTo(User, {
//   foreignKey: "userId",
//   as:"users"
// });


try {
  await User.sync();
} catch (err) {
  console.error(err);
}

export default User;
