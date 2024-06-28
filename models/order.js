"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "user" });

      Order.belongsToMany(models.Product, {
        through: models.OrderProduct,
        foreignKey: "orderId",
      });
    }
  }
  Order.init(
    {
      user: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: "Order",
      freezeTableName: true,
    },
  );
  return Order;
};
