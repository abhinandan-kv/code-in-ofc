import { DataTypes } from "sequelize";
import sequelize from "../Config/dbConfig";

const QUESTION = sequelize.define(
  "QuestionTable",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    questionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    questionAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdByName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdByEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);

try {
  await QUESTION.sync();
  console.log("QUESTIONMODEL SYNCED");
} catch (err) {
  console.error(err);
}

export default QUESTION;
