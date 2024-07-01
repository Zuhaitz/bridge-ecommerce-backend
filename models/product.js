"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });

      Product.belongsToMany(models.Order, {
        through: models.OrderProduct,
        foreignKey: "productId",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING(50),
      description: DataTypes.STRING(300),
      price: DataTypes.FLOAT,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      // para no generar los UpdateAt y CreatedAt que hay por defecto
      timestamps: false,
      //mantener singular
      freezeTableName: true,
    },
  );
  return Product;
};
