'use strict'
let entity    = require('../model/index.js');
let jwt       = require('jwt-simple');

module.exports.login = function *() {
  let resp = { code: 0 };
  let body = this.request.body;
  let options = {
    where: {
      name: body.username,
      password: body.password
    }
  }
  try {
    let result = yield entity.author.findOne(options);
    let token = jwt.encode({
      uid: result.id,
      date: new Date().getTime()
    }, 'wjb');
    this.session.token = token;
    resp = {
      code: 0,
      message: 'ok',
      result: token     
    };
  } catch (error) {
     resp = { code: 2, message: "error"}
  }
  this.body = resp;
}