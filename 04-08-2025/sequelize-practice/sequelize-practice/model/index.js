import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import UserModel from "./userModel.js";
import ProductModel from "./productModel.js";

const db = {};

db.sequelize = sequelize;
db.User = UserModel(sequelize, DataTypes);
db.Product = ProductModel(sequelize, DataTypes);

db.User.hasMany(db.Product, { foreignKey: "userId" });
db.Product.belongsTo(db.User, { foreignKey: "userId", as: "user" });

export default db;
