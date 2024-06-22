"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "user" });
    }
  }
  Order.init(
    {
      user: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: "Order",
    },
  );
  return Order;
};
