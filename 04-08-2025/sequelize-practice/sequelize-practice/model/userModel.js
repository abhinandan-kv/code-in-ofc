const UserModel = (sequelize, DataTypes) =>
  sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
    },
  }, {
    tableName: "UserTable",
  });

export default UserModel;
