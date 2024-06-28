"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Product", [
      {
        id: 300,
        name: "Banana",
        description: "banana",
        price: 2,
        categoryId: 300,
      },
      {
        id: 301,
        name: "Sandwich",
        description: "de atún",
        price: 22,
        categoryId: 300,
      },
      {
        id: 302,
        name: "Tarta de fresa",
        description: "esta rica :P",
        price: 8,
        categoryId: 300,
      },
      {
        id: 400,
        name: "Viaje al centro de la Tierra",
        description: "Libro escrito por Julio Verne",
        price: 30,
        categoryId: 400,
      },
      {
        id: 401,
        name: "DUNE",
        description: "Libro escrito por Frank Herbert",
        price: 50,
        categoryId: 400,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
