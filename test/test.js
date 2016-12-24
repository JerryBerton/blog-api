let rp = require("request-promise");
const data = { 
  username: 'wjb',
  password: 'wjb'
};
let tokenUrl = 'http://127.0.0.1:3000/authority/user/login';
rp({
  method: 'POST',
  uri: tokenUrl,
  body: data,
  json: true
})
.then(function(resp) {
  console.log("响应", resp);
})
.catch(function(err) {
  console.log(err);
})
