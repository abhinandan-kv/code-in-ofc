import { DataTypes } from "sequelize";
import sequelize from "../Config/dbConfig";


const Quiz = sequelize.define("QuizTable", {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    
}, {paranoid: true})