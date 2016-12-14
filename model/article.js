'use strict';
module.exports = function (sequelize, DataTypes) {
  let article = sequelize.define("article", {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.TEXT,
    hits: DataTypes.INTEGER,
    stars:  DataTypes.INTEGER,
    categoryId: {
      type: DataTypes.INTEGER,
      filed: 'category_id'
    }
  }, {
    tableName: 'article',
    associate: function(models) {
      article.belongsTo(models.category, {
          foreignKey: 'categoryId'
        });
      article.belongsToMany(models.tag, { 
         through: { model: models.tagProject },
         foreignKey: 'articleId', 
      });
    }
  });
  return article;
}