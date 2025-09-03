import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/database.js";

const BookTable = sequelize.define(
  "BookTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    bookName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicationName: {
      type: DataTypes.STRING,
    },
    publicationYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availability: {
      // in numbers instead of true or false
      type: DataTypes.INTEGER,
    },
    isbn: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    image: {
      // not yet planned to implement will handle later if time left
      type: DataTypes.TEXT,
    },
    references: {
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true,
  }
);

try {
  await BookTable.sync();
  console.log("BookTable synced");
} catch (err) {
  console.error(err);
}

export default BookTable;
