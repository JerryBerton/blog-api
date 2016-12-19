'use static'
let formParse   = require('co-busboy');
let fs          = require('fs');
let path        = require('path');
let config      = require('../config/config.js');
let qiniu       = require('../util/qiniu.js');

module.exports.upload = function *() {
  let part;
  let parts = formParse(this, { autoFields: true });
  let filesPath = [];
  while (part = yield parts) {
    let fileName = part.filename;
    let tmpPath = path.resolve(__dirname, `../${config.uploadDir}`) + '/' + fileName;
    let stream = fs.createWriteStream(tmpPath); //stream.path
    part.pipe(stream);
    try {
      let time = new Date().getTime();
      let _filename = time + fileName.slice(fileName.lastIndexOf('.'), fileName.length);
      let result = yield qiniu.uploadFile(_filename, stream.path);
      fs.unlink(tmpPath);
      filesPath.push(result.key);      
    } catch (error) {
      console.log(error);
    }
  }
  this.body = filesPath[0];
}