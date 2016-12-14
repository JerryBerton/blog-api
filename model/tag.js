'use strict'
module.exports = function (sequelize, DataTypes) {
  let tag = sequelize.define("tag", {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    categoryId: {
      type: DataTypes.INTEGER,
      filed: 'category_id'
    }
  }, {
    tableName: 'tag',
    associate: function(models) {
      tag.belongsTo(models.category, {
          foreignKey: 'categoryId'
      });
      tag.belongsToMany(models.article, { 
         through: { model: models.tagProject },
         foreignKey: 'tagId',
      });
    }
  });
  return tag;
}