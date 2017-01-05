module.exports = function *(next) {
  console.log('123312');
  yield next;
}