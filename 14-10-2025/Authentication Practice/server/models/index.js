import Users from "./userModel.js";
import userRefreshToken from "./userRefreshTokenModel.js";

Users.hasOne(userRefreshToken, { foreignKey: { name: "id", onDelete: "CASCADE" } });
userRefreshToken.belongsTo(Users);

export { Users, userRefreshToken };
