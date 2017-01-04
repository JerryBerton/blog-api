'use strict'

module.exports = function (sequelize, DataTypes) {
  let category = sequelize.define("category", {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'category',
  });
  return category;
}