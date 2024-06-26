"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Se tiene que añadir la foreingKey en ambos
      User.hasMany(models.Order, { foreignKey: "user" });
    }
  }
  User.init(
    {
      // Para que reconozca que name es la clave, y no el id
      name: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,

        validate: {
          len: {
            args: [2, 20],
            msg: "Username has to be between 2 and 20 characters long",
          },
          notEmpty: { msg: "Please introduce the username" },
          notNull: { msg: "Please introduce the username" },
        },
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,

        validate: {
          notNull: { msg: "Please introduce the email" },
          isEmail: { msg: "Please introduce a valid email" },
        },
      },
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
