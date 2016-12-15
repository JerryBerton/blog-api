'user strict';
let article     = require('./entry/article.js');
let category    = require('./entry/category.js');
let carousel    = require('./entry/carousel.js');
let test        = require('./entry/test.js');
let files       = require('./entry/files.js');

let routes = [
  { method: 'GET', path: '/', entry: test.hello},
  { method: 'POST', path: '/upload', entry: files.upload},

  { method: 'GET', path: '/authority/article', entry: article.getList},
  { method: 'GET', path: '/authority/category', entry: category.getList},
  { method: 'GET', path: '/authority/carousel', entry: carousel.getList},
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