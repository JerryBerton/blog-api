'use static'
let formParse   = require('co-busboy');
let fs          = require('fs');
let path        = require('path');
let config      = require('../config/config.js');

module.exports.upload = function *() {
  let part;
  let parts = formParse(this, {autoFields: true});
  let filenames = [];
  while (part = yield parts) {
    let fileName = part.filename;
    filenames.push(part.filename);
    let _path = path.resolve(__dirname, `../${config.uploadDir}`);
    let stream = fs.createWriteStream(_path + '/' + fileName);
    part.pipe(stream);
  }
  this.body = filenames;
}