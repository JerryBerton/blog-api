'use strict'
let entity    = require('../model/index.js');
let jwt       = require('jwt-simple');
let Cache = require('../util/cache.js');
let client = new Cache();

module.exports.login = function *() {
  let resp = { code: 0 };
  let body = this.request.body;
  let options = {
    where: {
      username: body.username,
      password: body.password
    }
  }
  
  try {
     let result = yield entity.author.findOne(options);
     let session_user = yield client.getAll('user');
     if (result) {
        if (!session_user) {
            session_user = {};
        }
        // 放入 reids
        session_user[result.username] = result.id;
        client.hset('user', session_user, 60);
     } else {
       resp = { code: 4, message: '登录失败' };
     }
  } catch (error) {
     console.log(error);
     resp = { code: 2, message: "api error"}
  }
  this.body = resp;
}