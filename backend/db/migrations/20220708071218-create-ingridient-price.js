module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('IngridientPrices', {
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
      ingridient_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Ingridients',
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
    await queryInterface.dropTable('IngridientPrices');
  },
};
