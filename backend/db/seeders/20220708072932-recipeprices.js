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
    {
      market_price: 410,
      recipe_id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      market_price: 550,
      recipe_id: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      market_price: 410,
      recipe_id: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      market_price: 410,
      recipe_id: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      market_price: 410,
      recipe_id: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      market_price: 460,
      recipe_id: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      market_price: 550,
      recipe_id: 11,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      market_price: 520,
      recipe_id: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RecipePrices', null, {});
  },
};
