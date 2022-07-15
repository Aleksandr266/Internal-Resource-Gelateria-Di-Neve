'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BaseIngridients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      base_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Bases',
          key: 'id',
        },
      },
      ingridient_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Ingridients',
          key: 'id',
        },
      },
      weight: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BaseIngridients');
  }
};
