'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserType, Production }) {
      User.UserType = User.belongsTo(UserType, {foreignKey: 'userType_id'})
      User.Productions = User.hasMany(Production, {foreignKey: 'user_id'})
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fullname: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    userType_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'UserTypes',
        key: 'id',
      },
    },
    login: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT
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
    modelName: 'User',
  });
  return User;
};
