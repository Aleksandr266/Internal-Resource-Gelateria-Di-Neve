module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserTypes', [{
      title: 'Директор',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Повар',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Технолог',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserTypes', null, {});
  },
};
