"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      name: DataTypes.STRING(50),
      email: DataTypes.STRING(50),
      password: DataTypes.STRING(50),
      role: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
