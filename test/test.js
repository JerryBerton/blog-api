let rp = require("request-promise");
const data = { 
  title: 'wjb', 
  description: '123',
  content: '123', 
  categoryId: 1,
  tags: []
};
let tokenUrl = 'http://127.0.0.1:3000/authority/article';
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
