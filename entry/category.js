'use strict'
let entity    = require('../model/index.js');

module.exports.getList = function *() {
  let query = this.request.query;
  let resp = { code: 1, message: 'error' };
  let current = parseInt(query.current) || 1;
  let pageSize = parseInt(query.pageSize) || 15;
  let result = {};
  let options = {};
  if (!query.isPage) {
    let total = yield entity.category.count();
    options = Object.assign(options, {
      offset:  Math.abs(current - 1) * pageSize,
     limit:  pageSize,
    });
    result = { current, pageSize, total}
  } 
  try {
    
    let data = yield entity.category.findAll(options);
    resp = {
      code: 0,
      message: 'ok',
      result: Object.assign({}, result, { data })
    };
  } catch (error) {
    
  }
  
  this.body = resp;
}
module.exports.insertOne = function *() {
 
  let body = this.request.body;
  let resp = { code: 1 };
  if (!body.name) {
    resp.message = "name can't be empty";
  } else {
     try {
      let data = yield entity.category.create(body);
      resp = {
        code: 0,
        message: 'ok',
        result: data.id
      }
    } catch (error) {
      resp.message = "api is Exception";
    }
  }
  this.body = resp;
}
module.exports.updateOne = function *() {
   let id = this.params.id;
   let body = this.request.body;
   let resp = { code: 1};
   let options = {
     where: { id }
   };
   if (!id) {
     resp = {
       code: 2,
       message: "id is null"
     }
   }
   try {
     let data = yield entity.category.update(body, options);
     resp = {
       code: 0,
       message: 'ok'
     }
   } catch (error) {
     console.log(error);
     resp.message = "api is Exception";
   }
   this.body = resp;
}
module.exports.deleteOne = function * () {
   let id = this.params.id;
   let resp = { code: 1};
   let options = {
     where: { id }
   };
   if (!id) {
     resp.message = "id is null"
   } else {
     try {
       let data = yield entity.category.destroy(options);
       resp = {
        code: 0,
        message: 'ok'
      };
     } catch (error) {
       console.log(error);
      resp.message = "api is Exception";
     }
   }
   this.body = resp;
}