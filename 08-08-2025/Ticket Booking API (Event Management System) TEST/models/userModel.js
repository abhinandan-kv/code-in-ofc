import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Users = sequelize.define(
  "UserTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Admin", "Organizer", "User"),
      defaultValue: "User",
    },
    ticketBooked:{
      type:DataTypes.STRING,
    },
    ticketTimeSlot:{
      type:DataTypes.INTEGER,
    },                                
    bookingStatus:{
      type:DataTypes.BOOLEAN,
    }
  },
  { paranoid: true }
);

// Users.hasMany(Event,{foreignKey:'id'})
// Event.belongsTo(Users, {foreignKey:'id'})


try {
  await Users.sync();
  console.log("Users synced succesfully");
} catch (err) {
  console.error(err);
}


export default Users