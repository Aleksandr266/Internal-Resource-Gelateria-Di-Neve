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
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {});
  },
};
