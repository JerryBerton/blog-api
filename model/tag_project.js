module.exports = function (sequelize, DataTypes) {
  let tagProject = sequelize.define("tagProject", {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    articleId: {
      type: DataTypes.STRING,
      field: 'article_id',
    },
    tagId: {
      type: DataTypes.INTEGER,
      field: 'tag_id'
    }
  }, {
    tableName: 'tag_project'
  });
  return tagProject;
}