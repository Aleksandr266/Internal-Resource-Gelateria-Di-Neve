const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Base, RecipeIngridient, Store, Production }) {
      Recipe.Base = Recipe.belongsTo(Base, { foreignKey: 'base_id' });
      Recipe.RecipeIngridients = Recipe.hasMany(RecipeIngridient, { foreignKey: 'recipe_id' });
      Recipe.Store = Recipe.hasOne(Store, { foreignKey: 'recipe_id' });
      Recipe.Productions = Recipe.hasMany(Production, { foreignKey: 'recipe_id' });
    }
  }
  Recipe.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      base_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Bases',
          key: 'id',
        },
      },
      market_price: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
      base_weight: {
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
      modelName: 'Recipe',
    },
  );
  return Recipe;
};
