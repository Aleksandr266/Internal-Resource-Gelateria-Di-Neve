const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IngridientPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Ingridient }) {
      IngridientPrice.Ingridient = IngridientPrice.belongsTo(Ingridient, { foreignKey: 'ingridient_id'} );
    }
  }
  IngridientPrice.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL,
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
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'IngridientPrice',
  });
  return IngridientPrice;
};
