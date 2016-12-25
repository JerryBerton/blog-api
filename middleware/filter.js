'use strict';
let Cache     = require('../util/cache.js');
let jwt       = require('jwt-simple');
let client = new Cache();

module.exports = function *(next) {
  let ctx = this.request;
  let _url = ctx.url.split('/');
  let session_user = yield client.getAll('user');
  if (_url.indexOf('authority') > -1 ) {
    let token = ctx.query.token || ctx.body.token;
    let token_user = jwt.decode(token, 'wjb');
    let flag = false;
    let resp = {};
    try {
      flag =  session_user.hasOwnProperty(token_user.username);
      resp = { code: 4, message: 'token失效' }
    } catch (error) {
      resp = { code: 4, message: 'token验证失败' }
    }
    if (flag) {
      yield next;
    } else {
      this.body = resp;
    }
  } else {
     yield next;
  }
}