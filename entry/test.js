'use strtic';
let reptile = require('../util/reptile.js');
let Cache = require('../util/cache.js');
let client = new Cache();
module.exports.hello = function *() {
  let result = null;

  try {
    result = yield reptile.getFex()
    let a = yield client.getCache('test');
    console.log('bb', a)
  } catch(e) {
    console.log(e);
  }
  this.body = result;
}