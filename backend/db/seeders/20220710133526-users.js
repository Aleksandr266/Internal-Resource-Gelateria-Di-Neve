module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        fullname: 'Петров Николай',
        userType_id: 3,
        login: 'petrov_nikolay',
        password: 'petrov_nikolay123!',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        fullname: 'Федотов Иван',
        userType_id: 1,
        login: 'fedotov_ivan',
        password: 'fedotov_ivan123!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'Федотов Саша',
        userType_id: 2,
        login: 'fedotov_sasha',
        password: 'fedotov_sasha6!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
