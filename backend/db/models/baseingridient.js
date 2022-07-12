const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BaseIngridient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Base, Ingridient }) {
      BaseIngridient.Base = BaseIngridient.belongsTo(Base, { foreignKey: 'base_id' });
      BaseIngridient.Ingridient = BaseIngridient.belongsTo(Ingridient, {
        foreignKey: 'ingridient_id',
      });
    }
  }
  BaseIngridient.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      base_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Bases',
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
      weight: {
        allowNull: false,
        type: DataTypes.TEXT,
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
      modelName: 'BaseIngridient',
    },
  );
  return BaseIngridient;
};
