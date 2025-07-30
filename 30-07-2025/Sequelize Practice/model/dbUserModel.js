import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Product from "./dbProductModel.js";

// Method 1 to define new model , ==== Although this method works as method 2 under the hood
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      // this can be simplified to {firstName: DataType.STRING}
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "uWu",
    },
  },
  {
    //Other options like timestamps:false,
  }
);

// User.associate = () => {
//   User.belongsTo(Product, {
//     foreignKey: "id",
//     as: "product",
//   });
// };


User.associate=()=>{
    User.hasOne(Product)
}

try {
  await User.sync();
  console.log("\x1b[32m Synchronization Successful- User Table \x1b[0m"); //\x1b is excape sequence [32m sets color to green [0m reset coloring
} catch (err) {
  console.error(err);
}

export default User;

// // Method 2 to define New Model

// class User extends Model { }
// User.init({
//     firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     lastName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     }
// }, {
//     sequelize, // need to pass the connnection instance
//     modelName: 'User'
// })
