'use strict';
let Application       = require('koa');
let compress          = require('koa-compress');
let bodyParser        = require('koa-bodyparser');
let _router           = require('koa-router')();
let logger            = require('koa-logger');
let cors              = require('koa-cors');
let session           = require('koa-session');
let config            = require('./config/config.js');
let routes            = require('./routes.js');
let filterToken       = require('./middleware/filter.js');
let app = Application();
app.keys = ['some secret hurr']
// 日志记录
app.use(logger());

// 跨域
app.use(cors({ credentials: true }));

// body 解析
app.use(bodyParser());
// 基于cookie的 session 配置
app.use(session({
  key: 'session:token', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
}, app));

app.use(filterToken);
// 初始化路由
routes.init(_router);

app.use(_router.routes());


// Compress
app.use(compress());

app.listen(config.port || 3000);
console.log('listening on port %s', config.port || 3000);
module.exports = app;