const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Production extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Recipe }) {
      Production.User = Production.belongsTo(User, { foreignKey: 'user_id' });
      Production.Recipe = Production.belongsTo(Recipe, { foreignKey: 'recipe_id' });
    }
  }
  Production.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      recipe_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Recipes',
          key: 'id',
        },
      },
      input_amount: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
      out_amount: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Production',
    },
  );
  return Production;
};
