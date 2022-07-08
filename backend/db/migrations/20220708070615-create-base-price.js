module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BasePrices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      base_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Bases',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BasePrices');
  },
};
