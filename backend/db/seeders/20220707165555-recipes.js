module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Recipes', [{
      title: 'Пломбир',
      base_id: 1,
      base_weight: 9.4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Молочный шоколад',
      base_id: 1,
      base_weight: 8.95,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Манго',
      base_id: 2,
      base_weight: 3.93,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Лимон',
      base_id: 2,
      base_weight: 6.5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Ванильное',
      base_id: 1,
      base_weight: 9.25,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Маскарпоне',
      base_id: 1,
      base_weight: 9.35,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Арахис',
      base_id: 1,
      base_weight: 8.33,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Мята',
      base_id: 1,
      base_weight: 9.45,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Базилик',
      base_id: 1,
      base_weight: 9.45,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Йогурт',
      base_id: 1,
      base_weight: 9.60,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Соленая Карамель',
      base_id: 1,
      base_weight: 9.00,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Печенье и Карамель ',
      base_id: 1,
      base_weight: 8.80,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {});
  },
};
