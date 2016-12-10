'user strict';


let test  = require('./entry/test.js');
let files = require('./entry/files.js');

let routes = [
  { method: 'GET', path: '/', entry: test.hello},
  { method: 'POST', path: '/upload', entry: files.upload},
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