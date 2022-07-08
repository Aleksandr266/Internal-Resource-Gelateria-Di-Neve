module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bases', [{
      title: 'Молочная база',
      fat: 6.3,
      dry_matter: 38.23,
      dry_milk_remainder: 11.05,
      antifris: 28.77,
      sugar: 21.75,
      glycemic_index: 16.7,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Сироп',
      fat: 0,
      dry_matter: 28.35,
      dry_milk_remainder: 0,
      antifris: 28.81,
      sugar: 27.96,
      glycemic_index: 23.19,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bases', null, {});
  },
};
