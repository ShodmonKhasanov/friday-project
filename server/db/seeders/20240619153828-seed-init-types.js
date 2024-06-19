'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('InitiativeTypes', [
      { name: 'Медицина', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Транспорт', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Благоустройство', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('InitiativeTypes', null, {});
  }
};
