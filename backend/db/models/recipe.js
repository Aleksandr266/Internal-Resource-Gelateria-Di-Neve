'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category, RecipeIngridient, Store, Production}) {
      Recipe.Category = Recipe.belongsTo(Category, {foreignKey: 'category_id'})
      Recipe.RecipeIngridients = Recipe.hasMany(RecipeIngridient, {foreignKey: 'recipe_id'})
      Recipe.Store = Recipe.belongsTo(Store, {foreignKey: 'recipe_id'})
      Recipe.Productions = Recipe.hasMany(Production, {foreignKey: 'recipe_id'})
    }
  }
  Recipe.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    category_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
    market_price: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};
