"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Product", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: "Category", key: "id" },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Product");
  },
};
