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
        allowNull: false,

        validate: {
          len: {
            args: [2, 20],
            msg: "Username has to be between 2 and 20 characters long",
          },
          notEmpty: { msg: "Please fill the username value" },
          notNull: { msg: "Please fill the username value" },
        },
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,

        validate: {
          notNull: { msg: "Por favor introduce tu correo" },
          isEmail: { msg: "Por favor introduce un correo valido" },
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
