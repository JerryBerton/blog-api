'use strict';
module.exports = function (sequelize, DataTypes) {
  let article = sequelize.define("article", {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM('1', '2'),
      allowNull: true, 
      defaultValue: 1
    },
    origin: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    author: DataTypes.STRING, 
    visits: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    stars:  {
      type: DataTypes.INTEGER,
      allowNull: true, 
      defaultValue: 0
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true, 
      filed: 'category_id'
    },
    disabled: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: false, 
      defaultValue: '0'
    }
  }, {
    tableName: 'article',
    associate: function(models) {
      article.belongsTo(models.category, {
          foreignKey: 'categoryId'
        });
    }
  });
  return article;
}