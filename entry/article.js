'use strict'
let entity    = require('../model/index.js');

module.exports.getList = function *() {
  let query = this.request.query;
  let resp = { code: 1, message: 'error' };
  let current = parseInt(query.current) || 1;
  let pageSize = parseInt(query.pageSize) || 15;

  let options = {
     offset:  Math.abs(current - 1) * pageSize,
     limit:  pageSize,
     include: [
      { model: entity.category },
      { model: entity.tag }
    ]
  }
  try {
    let total = yield entity.article.count();
    let data = yield entity.article.findAll(options);
    resp = {
      code: 0,
      message: 'ok',
      result: {
        current,
        pageSize,
        total,
        data
      },
    };
  } catch (error) {
    
  }
  
  this.body = resp;
}
module.exports.insertOne = function *() {
  let body = this.request.body;
  let resp = { code: 1 };
  if (!body.title) {
    resp.message = "名称不能为空";
  } else if (!body.description) {
    resp.message = "描述不能为空";
  } else if (!body.categoryId) {
    resp.message = "分类不能为空";
  } else if (!body.content) {
    resp.message = "内容不能为空";
  } else {
     try {
      let data = yield entity.article.create(body);
      resp = {
        code: 0,
        message: 'ok',
        result: data.id
      }
    } catch (error) {
      
    }
  }
  this.body = resp;
}