import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Event = sequelize.define(
  "EventTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    oranizerName:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    timeSlot: {
      type: DataTypes.STRING,
    },
    eventDate:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    ticketLimit: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    saleEndDate:{
      type:DataTypes.STRING,
    }
  },
  { paranoid: true }
);

// Event.hasMany(Booking,{
//     foreignKey:'id'
// });
// Booking.belongsTo(Event, {
//   foreignKey: 'id',
//   as: "userID",
// });

// Event.hasMany(Users);
// Users.belongsTo(Event, { foreignKey: "id", as: "userId" });



try {
  await Event.sync();
  console.log("EventTable Synced successfully");
} catch (err) {
  console.error(err);
}

export default Event;
