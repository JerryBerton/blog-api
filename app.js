'use strict';
let Application       = require('koa');
let compress          = require('koa-compress');
let bodyParser        = require('koa-bodyparser');
let _router           = require('koa-router')();
let logger            = require('koa-logger');
let cors              = require('koa-cors');

let config            = require('./config/config.js');
let routes            = require('./routes.js');

let app = Application();
// 日志记录
app.use(logger());

// 跨域
app.use(cors());

// body 解析
app.use(bodyParser());

routes.init(_router);

app.use(_router.routes());


// Compress
app.use(compress());

app.listen(config.port || 3000);
console.log('listening on port %s', config.port || 3000);
module.exports = app;