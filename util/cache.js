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
/** hash 操作封装 */
Cache.prototype.hset = function(key, value, expire = 14400) {
  this.client.hmset(key, value, (err, replay) => {
    if (!err) {
      this.client.expire(key, 60 * expire);
    } 
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
/** --end--*/

/** list 操作封装 */
Cache.prototype.lpush = function(key, value) {
  if (Array.isArray(value)) {
    this.client.rpush(key, value);
  } else {
     this.client.lpush(key, value);
  }
}
Cache.prototype.llen = function(key) {
  return new Promise((resolve, reject) => {
    this.client.llen(key, function(err, replay) {
      if (!err) {
        resolve(replay)
      } else {
        reject(err);
      }
    });
  })

}
Cache.prototype.lrange = function(key, start = 0, end = 1) {
  return new Promise((resolve, reject) => {
    this.client.lrange(key, start, end, function(err, replay) {
      if (!err) {
        resolve(replay)
      } else {
        reject(err);
      }
    });
  })

}
/** -- end --*/
module.exports = Cache;