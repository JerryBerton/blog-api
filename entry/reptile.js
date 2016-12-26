'use strict'
let reptile   = require('../util/reptile.js'); 
let Cache     = require('../util/cache.js');
let client = new Cache();
module.exports.getCnodeList = function *() {
  let resp = { code: 0 }
  try {
    // 先从redis 里面获取
   let len = yield client.llen('r_cnode');
   if (len && len > 0) {
     let result = [];
     let data = yield client.lrange('r_cnode', 0, len);
     if (data) {
       result = data.map( item => JSON.parse(item));
     }
     resp = { code: 0, message: '缓存数据', result }
   } else {
     let result = yield reptile.cnodeList();
     let data = result.map(item => {
       return JSON.stringify(item);
     })
     client.lpush('r_cnode', data);
     resp = { code: 0,  message: '从新捕获列表', result}
   }
  } catch (error) {
    console.log(error);
  }
  this.body = resp;
}
module.exports.getCnodeDetail = function *() {
  let query = this.request.query;
  let id = this.request.query.id;
  let href = this.request.query.href;
  let resp = { code: 0 }
  try {
    let result = yield reptile.cnodeDetail(href);
    resp = { code: 0, message: 'ok', result }
  } catch (error) {
    resp = { code: 1, message: 'api request nll'}
  }
  this.body = resp;
}