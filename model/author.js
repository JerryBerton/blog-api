'use strict';
module.exports = function (sequelize, DataTypes) {
  let author = sequelize.define("author", {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.STRING,
    sex: DataTypes.ENUM('1', '2'),
    marriage: DataTypes.ENUM('1', '2'),
    personality: DataTypes.STRING,
    introduction: DataTypes.TEXT,
    qq: DataTypes.STRING,
    wechat: DataTypes.STRING,
    weibo:  DataTypes.STRING,
    phone:  DataTypes.STRING,
    Address:  DataTypes.STRING,
    company: DataTypes.STRING
  }, {
    tableName: 'author'
  });
  return author;
}