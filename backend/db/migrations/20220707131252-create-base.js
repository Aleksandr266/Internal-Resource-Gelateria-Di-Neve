'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      fat: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      dry_matter: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      dry_milk_remainder: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      antifris: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      sugar: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      glycemic_index: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bases');
  }
};
