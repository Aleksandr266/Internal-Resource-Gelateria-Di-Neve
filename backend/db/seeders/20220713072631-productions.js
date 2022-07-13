module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Productions', [{
      user_id: 2,
      recipe_id: 1,
      input_amount: 2,
      out_amount: 1.8,
      createdAt: '2022-07-08 10:21:56.485+03',
      updatedAt: '2022-07-08 10:21:56.485+03',
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Productions', null, {});
  },
};
