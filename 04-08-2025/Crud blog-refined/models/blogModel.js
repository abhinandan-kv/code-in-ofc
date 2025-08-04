import { DataTypes, DATE, Sequelize } from "sequelize";
import sequelize from "../config/database.js";

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    blogTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blogDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blogImages: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    approved:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue: 'false',
    }
    // created_at: {
    //   type: Sequelize.DATE(3),
    //   defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
    // },
    // updated_at: {
    //   type: Sequelize.DATE(3),
    //   defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)"),
    // },
  },
  {
    tableName: "Blog",
    paranoid: true,
    deletedAt: 'destroyTime',
  }
);

try {
  Blog.sync();
  console.log("Synchronization Successful - Blog Table");
} catch (err) {
  console.error(err);
}

export default Blog;
