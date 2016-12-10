'use static'
module.exports.upload = function * () {
  console.log(this.request);
  this.body = {
    code: 0
  }
}