'use strict'
let entity    = require('../model/index.js');

module.exports.getList = function *() {
  let query = this.request.query;
  let resp = { code: 1, message: 'error' };
  try {  
    let data = yield entity.category.findAll();
    resp = {
      code: 0,
      message: 'ok',
      result: data
    };
  } catch (error) {
    console.log(error);
    resp = { code: 1, message: 'api is error' };
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