'use strict'

module.exports = function (sequelize, DataTypes) {
  let carousel = sequelize.define("carousel", {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
    },
    label: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    tableName: 'carousel'
  });
  return carousel;
}