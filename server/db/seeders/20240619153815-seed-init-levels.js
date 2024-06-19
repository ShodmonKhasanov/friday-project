'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('InitLevels', [
      { name: 'Федеральный округ', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Регион', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Муниципалитет', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('InitLevels', null, {});
  }
};
