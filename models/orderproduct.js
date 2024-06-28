"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    static associate(models) {}
  }
  OrderProduct.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderProduct",
      timestamps: false,
    },
  );

  return OrderProduct;
};
