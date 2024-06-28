"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Category", [
      { id: 300, name: "Food", description: "Alimentation related products." },
      { id: 400, name: "Literature", description: "Reading related products." },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
