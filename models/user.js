"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order);
    }
  }
  User.init(
    {
      // Para que reconozca que name es la clave, y no el id
      name: {
        type: DataTypes.STRING(50),
        primaryKey: true,
      },
      email: DataTypes.STRING(50),
      password: DataTypes.STRING,
      role: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
      timestamps: false,
    },
  );
  return User;
};
