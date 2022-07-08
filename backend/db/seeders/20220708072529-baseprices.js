module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('BasePrices', [{
      price: 75.3,
      base_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 31,
      base_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BasePrices', null, {});
  },
};
