'use strict';
let Application       = require('koa');
let compress          = require('koa-compress');
let bodyParser        = require('koa-bodyparser');
let _router           = require('koa-router')();
let logger            = require('koa-logger');
let cors              = require('koa-cors');
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

app.use(filterToken);
// 初始化路由
routes.init(_router);

app.use(_router.routes());


// Compress
app.use(compress());

app.listen(config.port || 3000);
console.log('listening on port %s', config.port || 3000);
module.exports = app;