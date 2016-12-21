let rp = require("request-promise");
const data = { 
  name: 'Java',
  tags: ['spring', 'mysql']
};
let tokenUrl = 'http://127.0.0.1:3000/authority/category';
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
