'use strict'
let entity    = require('../model/index.js');

module.exports.getList = function *() {
  let query = this.request.query;
  let resp = { code: 1, message: 'error' };
  let current = parseInt(query.current) || 1;
  let pageSize = parseInt(query.pageSize) || 15;
  let result = {};
  let options = {
    include: [
      { model: entity.tag }
    ]
  }
  if (!query.isPage) {
    let total = yield entity.category.count();
    options = Object.assign(options, {
      offset:  Math.abs(current - 1) * pageSize,
     limit:  pageSize,
    });
    result = { current, pageSize, total}
  } 
  try {
    
    let data = yield entity.category.findAll(options);
    resp = {
      code: 0,
      message: 'ok',
      result: Object.assign({}, result, { data })
    };
  } catch (error) {
    
  }
  
  this.body = resp;
}