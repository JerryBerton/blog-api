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
module.exports.getOne = function *() {
  let resp = { code: 1 };
  let options = {
    include: [
      { model: entity.category }]
  }; 
  if (this.params.id) {
    let id = this.params.id;
    try {
      let result = yield entity.article.findById(id, options);
      resp = {
        code: 0,
        message: 'ok',
        result
      }
    } catch (error) {
      console.log(error);
      resp.message = "api is Exception";
    }   
  } else {
    resp.message = "api is Exception";
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
  }  else if (!body.content) {
    resp.message = "content can't be empty";
  } else {
     try {
       if (body.tags) {
          let data = yield entity.article.createTo(entity.tagProject, body);
       } else {
         let data = yield entity.article.create(body);
       }  
      resp = {
        code: 0,
        message: 'ok',
        result: new Date().getTime()
      }
    } catch (error) {
      console.log(error);
      resp.message = "添加失败";
    }
  }
  this.body = resp;
}