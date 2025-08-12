import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Booked = sequelize.define(
  "BookedTable",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    bookedEvent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookedTimeSlot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  { paranoid: true }
);

try {
  await Booked.sync();
  console.log("Booked Table synced");
} catch (err) {
  console.error(err);
}

export default Booked;

// for some reason this table is getting created nor i got any error in console so i can debug, tried many ways,
//  found other method to perform operation regardless of this.
