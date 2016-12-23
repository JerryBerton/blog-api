'use strict'
let entity    = require('../model/index.js');

module.exports.getList = function *() {
  let query = this.request.query;
  let resp = { code: 1, message: 'error' };
  let current = parseInt(query.current) || 1;
  let pageSize = parseInt(query.pageSize) || 10;
  

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
    resp.message = "title can't be empty";
  } else if (!body.description) {
    resp.message = "description can't be empty";
  } else if (!body.categoryId) {
    resp.message = "categoryId can't be empty";
  } else if (!body.content) {
    resp.message = "content can't be empty";
  } else {
     try {
      let  data = yield entity.article.createTo(entity.tagProject, body);
      resp = {
        code: 0,
        message: 'ok',
        result: new Date().getTime()
      }
    } catch (error) {
      resp.message = "添加失败";
    }
  }
  this.body = resp;
}