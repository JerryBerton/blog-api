'use strict';

let config = {
  // 端口号配置
  port: 3000,
  // 数据库配置
  db: {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: '3306',
    database: 'test',
    username: 'root',
    password: '123456'
  },
  uploadDir: 'tmp'
}

//当NODE_ENV环境变量值为development时 
module.exports = config