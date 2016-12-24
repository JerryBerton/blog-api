'use strict';

let config = {
  // 端口号配置
  port: 3000,
  // 数据库配置
  db: {
    host: '101.200.165.146',
    dialect: 'mysql',
    port: '3306',
    database: 'test',
    username: 'root',
    password: '123456'
  },
  // redis 配置
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
  // 上传文件缓存路径
  uploadDir: 'tmp',
  // 七牛 
  qiniu: {
    ACCESS_KEY: 'tHx_NFyqZL0AnhocyT3k471GexaWThXZJWbr5xhi',
    SECRET_KEY: 'yc0IhF18-bUKz45SpiyObA4BqUHIhtczbyro19_-',
    bucket: 'qiniu-sdk-test',
    domain: 'http://ofdlfhayt.bkt.clouddn.com/',
  }
}

//当NODE_ENV环境变量值为development时 
module.exports = config