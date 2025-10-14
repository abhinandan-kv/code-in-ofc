import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const userRefreshToken = sequelize.define("userRefreshTokenTable", {
  
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

try {
  await userRefreshToken.sync();
  console.log("userRefreshToken Synced");
} catch (error) {
  console.error(error);
}

export default userRefreshToken;
