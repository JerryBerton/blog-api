'use strict';
let redis = require('redis');
let config = require('../config/config.js')


function Cache() {
  this.client = this.client ? this.client : redis.createClient(config.redis.port, config.redis.host);
  this.client.on('error', function(error) {
    console.log('error:', error);
  })
}
// string 
Cache.prototype.set = function(key, value) {
  this.client.set(key, value, (err, replay) => {
     
  });
}
Cache.prototype.hset = function(key, value, expire = 1) {
  this.client.hmset(key, value, (err, replay) => {
    if (!err) {
      this.client.expire(key, 60 * expire);
    } 
  });
  
}
Cache.prototype.getCache = function(key) {
  return new Promise((resolve, reject) => {
    this.client.get(key, function(err, replay) {
      if (err) {
        reject(err);
      } else {
        resolve(replay);
      }
    });
  });
}
Cache.prototype.getAll = function (key) {
  return new Promise((resolve, reject) => {
    this.client.hgetall(key, function(err, replay) {
      if (err) {
        reject(err);
      } else {
        resolve(replay);
      }
    })
  })
}
module.exports = Cache;