'use static'
let formParse   = require('co-busboy');
let fs          = require('fs');
let path        = require('path');
let config      = require('../config/config.js');

var qiniu = require("qiniu");
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;

//构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+ key);
  return putPolicy.token();
}

// //构造上传函数
function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log(ret);       
      } else {
        // 上传失败， 处理返回代码
        console.log('出错了', err);
      }
  });
}

module.exports.upload = function *() {
  let part;
  let parts = formParse(this, {autoFields: true});
  let filenames = [];
  while (part = yield parts) {
    let fileName = part.filename;
    filenames.push(part.filename);
    let _path = path.resolve(__dirname, `../${config.uploadDir}`);
    let stream = fs.createWriteStream(_path + '/' + fileName); //stream.path
    part.pipe(stream);
    let token = uptoken(config.qiniu.bucket, fileName); 
    uploadFile(token, fileName, stream.path);

  }
  this.body = filenames;
}