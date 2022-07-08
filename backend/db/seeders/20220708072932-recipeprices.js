module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RecipePrices', [{
      market_price: 310,
      recipe_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      market_price: 420,
      recipe_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      market_price: 525,
      recipe_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      market_price: 455,
      recipe_id: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RecipePrices', null, {});
  },
};
