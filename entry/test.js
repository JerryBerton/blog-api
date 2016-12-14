'use strtic';
let reptile = require('../util/reptile.js');
module.exports.hello = function *() {
  let result = null;
  try {
    result = yield reptile.getFex()
  } catch(e) {
    console.log(e);
  }
  console.log(result);
  this.body = result;
}