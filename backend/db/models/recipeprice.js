const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RecipePrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Recipe }) {
      RecipePrice.Recipe = RecipePrice.belongsTo(Recipe, { foreignKey: 'recipe_id' });
    }
  }
  RecipePrice.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    market_price: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    recipe_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Recipes',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'RecipePrice',
  });
  return RecipePrice;
};
