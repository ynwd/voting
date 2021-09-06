'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class View extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  View.init({
    userID: DataTypes.INTEGER,
    movies: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'View',
  });
  return View;
};