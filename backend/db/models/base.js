const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Base extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Recipe, BaseIngridient, BasePrice }) {
      Base.Recipes = Base.hasMany(Recipe, { foreignKey: 'base_id' });
      Base.BaseIngridients = Base.hasMany(BaseIngridient, { foreignKey: 'base_id' });
      Base.BasePrices = Base.hasMany(BasePrice, { foreignKey: 'base_id' });
    }
  }
  Base.init({
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
    fat: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    dry_matter: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    dry_milk_remainder: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    antifris: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    sugar: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    glycemic_index: {
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
  }, {
    sequelize,
    modelName: 'Base',
  });
  return Base;
};
