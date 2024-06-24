"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {}
  }
  Token.init(
    {
      token: DataTypes.STRING,
      username: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Token",
    },
  );
  return Token;
};
