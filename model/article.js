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
    content: DataTypes.TEXT('tiny'),
    image: DataTypes.STRING,
    hits: {
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
      allowNull: false, 
      filed: 'category_id'
    },
    disabled: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: false, 
      defaultValue: '0'
    }
  }, {
    tableName: 'article',
    classMethods: {
      // 开启事物性扩展model
      createTo: function(model, data) {
        return sequelize.transaction(function(t) {
          return article.create(data, { transaction: t})
          .then(function(item) {
            let tags = data.tags.map(function(n) {
              return { articleId: item.id, tagId: n}
            });
            return model.bulkCreate(tags, { transaction: t});
          })
        })
      }
    },
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