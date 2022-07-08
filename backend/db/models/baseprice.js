const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BasePrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Base }) {
      BasePrice.Base = BasePrice.belongsTo(Base, { foreignKey: 'base_id' });
    }
  }
  BasePrice.init({
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
    base_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Bases',
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
    modelName: 'BasePrice',
  });
  return BasePrice;
};
