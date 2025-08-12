import Booked from "./bookedModel.js";
import Event from "./eventModel.js";
import Users from "./userModel.js";

Users.hasMany(Event, { foreignKey: "id" });
Event.belongsTo(Users, { foreignKey: "id", as: "userId" });

Event.hasMany(Booked, { foreignKey: "id" });
Booked.belongsTo(Event, { foreignKey: "id", as: "userId" });
