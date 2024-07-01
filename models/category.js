"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, { foreignKey: "categoryId" });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING(50),
      description: DataTypes.STRING(300),
    },
    {
      sequelize,
      modelName: "Category",
      // para no generar los UpdateAt y CreatedAt que hay por defecto
      timestamps: false,
      //mantener singular
      freezeTableName: true,
    },
  );
  return Category;
};
