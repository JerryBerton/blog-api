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
  }
  try {
    let total = yield entity.carousel.count();
    let data = yield entity.carousel.findAll(options);
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
  if (!body.url) {
    resp.message = "url字段能为空";
  } else {
    try {
      let data = yield entity.carousel.create(body);
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