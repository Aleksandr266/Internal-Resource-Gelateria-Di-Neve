module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        fullname: 'Петров Николай',
        userType_id: 3,
        login: 'petrov_nikolay',
        password: '$2b$10$CdziBnAsrdBDx0UaYQ/M/eFlFyKG1d23BPj5nkU5Zo.sjeNQd7Tbm',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        fullname: 'Федотов Иван',
        userType_id: 1,
        login: 'fedotov_ivan',
        password: '$2b$10$CdziBnAsrdBDx0UaYQ/M/eFlFyKG1d23BPj5nkU5Zo.sjeNQd7Tbm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'Федотов Саша',
        userType_id: 2,
        login: 'fedotov_sasha',
        password: '$2b$10$CdziBnAsrdBDx0UaYQ/M/eFlFyKG1d23BPj5nkU5Zo.sjeNQd7Tbm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
