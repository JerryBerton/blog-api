'use strict';

let qiniu = require("qiniu");
let config      = require('../config/config.js');
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;

//构建上传策略函数
function getUptoken(key) {
  let putPolicy = new qiniu.rs.PutPolicy( config.qiniu.bucket + ":" + key);
  return putPolicy.token();
}

// //构造上传函数
exports.uploadFile = function (key, localFile) {
  let extra = new qiniu.io.PutExtra();
  let uptoken = getUptoken(key);
  // 返回一个 promise
  return new Promise((resolve, reject) => {
     qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
         resolve({
           hash: ret.hash,
           key: config.qiniu.domain + ret.key
         });       // 上传成功， 处理返回值
      } else {
        reject(err);
      }
    });
  })
 
}