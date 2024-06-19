'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Initiatives', [
      {
        title: 'Улучшение медицинского обслуживания',
        description: 'Подробное описание инициативы по улучшению медицинского обслуживания с мотивацией.',
        userId: 1, // Предположим, что пользователь с ID 1 существует
        votesCount: 100,
        percentFor: 75.5,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 дней с сегодняшнего дня
        initiativeTypeId: 1, // Предположим, что тип инициативы с ID 1 (медицина) существует
        initLevelId: 1, // Предположим, что уровень инициативы с ID 1 (федеральный округ) существует
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Развитие общественного транспорта',
        description: 'Подробное описание инициативы по развитию общественного транспорта с мотивацией.',
        userId: 1, // Предположим, что пользователь с ID 2 существует
        votesCount: 150,
        percentFor: 60.3,
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 дней с сегодняшнего дня
        initiativeTypeId: 2, // Предположим, что тип инициативы с ID 2 (транспорт) существует
        initLevelId: 2, // Предположим, что уровень инициативы с ID 2 (регион) существует
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Благоустройство городских парков',
        description: 'Подробное описание инициативы по благоустройству городских парков с мотивацией.',
        userId: 1, // Предположим, что пользователь с ID 3 существует
        votesCount: 200,
        percentFor: 85.7,
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 дней с сегодняшнего дня
        initiativeTypeId: 3, // Предположим, что тип инициативы с ID 3 (благоустройство) существует
        initLevelId: 3, // Предположим, что уровень инициативы с ID 3 (муниципалитет) существует
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Initiatives', null, {});
  }
};
