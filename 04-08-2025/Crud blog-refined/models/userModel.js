import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "Users100",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    hashedpassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
    },
    updatedby: {
      type: DataTypes.STRING,
    },
    approved: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "false",
    },
    created_at: {
      type: Sequelize.DATE(3),
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
    },
    updated_at: {
      type: Sequelize.DATE(3),
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)"),
    },
  },
  {
    tableName: "Users100",
    timestamps: false,
  }
);  
try {
  await User.sync();
  console.log("Synchronization Successful - User Table ");
} catch (err) {
  console.error(err);
}

export default User;
