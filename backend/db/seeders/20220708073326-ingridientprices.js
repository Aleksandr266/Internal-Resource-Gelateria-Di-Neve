module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('IngridientPrices', [{
      price: 35.3,
      ingridient_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 240,
      ingridient_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 40,
      ingridient_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 60,
      ingridient_id: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 85.3,
      ingridient_id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 2000,
      ingridient_id: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 1400,
      ingridient_id: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 150,
      ingridient_id: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 900,
      ingridient_id: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 0,
      ingridient_id: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 0,
      ingridient_id: 11,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 148,
      ingridient_id: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 280,
      ingridient_id: 13,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 342,
      ingridient_id: 14,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 0,
      ingridient_id: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 77.9,
      ingridient_id: 16,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 30.44,
      ingridient_id: 17,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 1335.00,
      ingridient_id: 18,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 2252.00,
      ingridient_id: 19,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 410.00,
      ingridient_id: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 1000.00,
      ingridient_id: 21,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 1000.00,
      ingridient_id: 22,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 2240.00,
      ingridient_id: 23,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 160.00,
      ingridient_id: 24,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 1460.00,
      ingridient_id: 25,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('IngridientPrices', null, {});
  },
};
