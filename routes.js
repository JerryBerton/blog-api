'user strict';
let article     = require('./entry/article.js');
let category    = require('./entry/category.js');
let carousel    = require('./entry/carousel.js');
let tag         = require('./entry/tag.js');
let user        = require('./entry/user.js');
let test        = require('./entry/test.js');
let files       = require('./entry/files.js');

let routes = [
  { method: 'GET', path: '/', entry: test.hello},
  { method: 'POST', path: '/upload', entry: files.upload},

  { method: 'GET', path: '/authority/article', entry: article.getList},
  { method: 'POST', path: '/authority/article', entry: article.insertOne},
  { method: 'GET', path: '/authority/category', entry: category.getList},
  { method: 'POST', path: '/authority/category', entry: category.insertOne},
  { method: 'PUT', path: '/authority/category/:id', entry: category.updateOne},
  { method: 'DELETE', path: '/authority/category/:id', entry: category.deleteOne},

  { method: 'POST', path: '/authority/tag', entry: tag.insertOne},
  { method: 'DELETE', path: '/authority/tag/:id', entry: tag.deleteOne},
  
  { method: 'GET', path: '/authority/carousel', entry: carousel.getList},
  { method: 'POST', path: '/authority/carousel', entry: carousel.insertOne},
  { method: 'POST', path: '/authority/user/login', entry: user.login}
];

module.exports.init = function (_) {
  for (let item of routes) {
    if (item.method === 'GET') {
      _.get(item.path, item.entry);
    }
    if (item.method === "POST") {
      _.post(item.path, item.entry);
    }
    if (item.method === "PUT") {
      _.put(item.path, item.entry);
    }
    if (item.method === "DELETE") {
      _.delete(item.path, item.entry);
    }
  }
}