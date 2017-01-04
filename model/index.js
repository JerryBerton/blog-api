
'use strict'
let fs =  require('fs');
let path = require("path");
let Sequelize = require('sequelize');
let config = require('../config/config.js');
let db = config.db;


let sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
  port: db.port
});
let entity = {};
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    let model = sequelize.import(path.join(__dirname, file));
    entity[model.name] = model;
  });

 // 建立关联关系
  Object.keys(entity).forEach(function(modelName) {
    if (entity[modelName].options.hasOwnProperty('associate')) {
     entity[modelName].options.associate(entity);
    }
  });
  if (process.env.NODE_ENV === 'sync') {
    sequelize.sync({ force: true }).then(function(result) {
    console.log("正在初始化数据.....");
    setTimeout(function() {
      entity.author.create({
        username: 'admin',
        password: 'admin'
      });
      console.log("初始化数据完成");
      }, 2000)
    }).catch(function (error) {
    console.log('create model table is error', error)
  });
  }
  module.exports = entity;