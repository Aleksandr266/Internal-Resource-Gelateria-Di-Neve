'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecipeIngridient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Recipe, Ingridient}) {
      RecipeIngridient.Recipe = RecipeIngridient.belongsTo(Recipe, {foreignKey: 'recipe_id'})
      RecipeIngridient.Ingridient = RecipeIngridient.belongsTo(Ingridient, {foreignKey: 'ingridient_id'})
    }
  }
  RecipeIngridient.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    recipe_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Recipes',
        key: 'id',
      },
    },
    ingridient_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Ingridients',
        key: 'id',
      },
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
    modelName: 'RecipeIngridient',
  });
  return RecipeIngridient;
};
