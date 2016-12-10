'use strtic'

module.exports.hello = function *() {
  console.log(this.request.query)
  this.body = this.request.body;
}