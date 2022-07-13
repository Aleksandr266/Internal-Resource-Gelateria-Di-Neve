module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        fullname: 'Петров Николай',
        userType_id: 3,
        login: 'petrov_nikolay',
        password: '$2b$10$CdziBnAsrdBDx0UaYQ/M/eFlFyKG1d23BPj5nkU5Zo.sjeNQd7Tbm',
        works: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        fullname: 'Федотов Иван',
        userType_id: 1,
        login: 'fedotov_ivan',
        password: '$2b$10$CdziBnAsrdBDx0UaYQ/M/eFlFyKG1d23BPj5nkU5Zo.sjeNQd7Tbm',
        works: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'Федотов Саша',
        userType_id: 2,
        login: 'fedotov_sasha',
        password: '$2b$10$CdziBnAsrdBDx0UaYQ/M/eFlFyKG1d23BPj5nkU5Zo.sjeNQd7Tbm',
        works: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'ЛжеДмитрий повар',
        userType_id: 2,
        login: 'ne_rabotau123',
        password: '$2b$10$CdziBnAsrdBDx0UaYQ/M/eFlFyKG1d23BPj5nkU5Zo.sjeNQd7Tbm',
        works: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'ЛжеДмитрий технолог',
        userType_id: 3,
        login: 'davno_ne_rabotau',
        password: '$2b$10$CdziBnAsrdBDx0UaYQ/M/eFlFyKG1d23BPj5nkU5Zo.sjeNQd7Tbm',
        works: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
