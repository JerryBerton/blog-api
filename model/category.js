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
    classMethods: {
      createTo: function(data, model) {
        return sequelize.transaction(function(t) {
          return category.create(data, { transaction: t})
          .then(function(item) {
            let tags = data.tags.map(function(n) {
              return { categoryId: item.id, name: n}
            });
            return model.bulkCreate(tags, { transaction: t});
          })
        })
      }
    },
    associate: function(model) {
      category.hasMany(model.tag, { foreignKey: 'categoryId'})
    }
  });
  return category;
}