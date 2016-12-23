module.exports = function *(next) {
  let ctx = this.request;
  let _url = ctx.url.split('/');
  if (_url.indexOf('authority') !== -1 || _url.indexOf('login') === -1 ) {
    let token = ctx.query.token || ctx.body.token;
    if (token === this.session) {
      yield next;
    } else {
      this.body = { code: 4, message: 'token 失效或不正确'};
    }
  }
  yield next;
}