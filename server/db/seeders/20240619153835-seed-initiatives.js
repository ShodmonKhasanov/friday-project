
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Initiatives', [
      {
        title: 'Улучшение системы образования',
        description: 'Подробное описание инициативы по улучшению системы образования с мотивацией.',
        userId: 1,
        votesCount: 80,
        percentFor: 72.3,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        initiativeTypeId: 3, // Предположим, что тип инициативы с ID 4 (образование) существует
        initLevelId: 1, // Федеральный округ
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Развитие инфраструктуры для велосипедистов',
        description: 'Подробное описание инициативы по развитию инфраструктуры для велосипедистов с мотивацией.',
        userId: 1,
        votesCount: 120,
        percentFor: 65.4,
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        initiativeTypeId: 3, // Предположим, что тип инициативы с ID 5 (транспорт) существует
        initLevelId: 2, // Регион
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Создание новых зеленых зон в городе',
        description: 'Подробное описание инициативы по созданию новых зеленых зон в городе с мотивацией.',
        userId: 1,
        votesCount: 150,
        percentFor: 78.9,
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        initiativeTypeId: 3, // Предположим, что тип инициативы с ID 6 (благоустройство) существует
        initLevelId: 3, // Муниципалитет
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Улучшение доступности медицинских услуг для пожилых',
        description: 'Подробное описание инициативы по улучшению доступности медицинских услуг для пожилых с мотивацией.',
        userId: 1,
        votesCount: 90,
        percentFor: 68.2,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        initiativeTypeId: 1, // Медицина
        initLevelId: 1, // Федеральный округ
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Развитие сети общественного транспорта в пригородах',
        description: 'Подробное описание инициативы по развитию сети общественного транспорта в пригородах с мотивацией.',
        userId: 1,
        votesCount: 130,
        percentFor: 71.6,
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        initiativeTypeId: 2, // Транспорт
        initLevelId: 2, // Регион
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Обустройство детских игровых площадок',
        description: 'Подробное описание инициативы по обустройству детских игровых площадок с мотивацией.',
        userId: 1,
        votesCount: 180,
        percentFor: 82.1,
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        initiativeTypeId: 3, // Благоустройство
        initLevelId: 3, // Муниципалитет
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Повышение качества школьного питания',
        description: 'Подробное описание инициативы по повышению качества школьного питания с мотивацией.',
        userId: 1,
        votesCount: 110,
        percentFor: 75.5,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        initiativeTypeId: 3, // Образование
        initLevelId: 1, // Федеральный округ
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Строительство велодорожек в городе',
        description: 'Подробное описание инициативы по строительству велодорожек в городе с мотивацией.',
        userId: 1,
        votesCount: 140,
        percentFor: 69.7,
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        initiativeTypeId: 3, // Транспорт
        initLevelId: 2, // Регион
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Озеленение городских улиц',
        description: 'Подробное описание инициативы по озеленению городских улиц с мотивацией.',
        userId: 1,
        votesCount: 170,
        percentFor: 80.3,
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        initiativeTypeId: 3, // Благоустройство
        initLevelId: 3, // Муниципалитет
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Улучшение доступности медицинской помощи в сельской местности',
        description: 'Подробное описание инициативы по улучшению доступности медицинской помощи в сельской местности с мотивацией.',
        userId: 1,
        votesCount: 100,
        percentFor: 72.9,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        initiativeTypeId: 1, // Медицина
        initLevelId: 1, // Федеральный округ
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Initiatives', null, {});
  }
};
