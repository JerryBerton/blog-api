let Cache = require('../util/cache.js');
let client = new Cache();
var superagent = require('superagent');
var cheerio = require('cheerio');
// 爬虫百度的技术网
function reptileFex() {
  let targetUrl = 'http://fex.baidu.com';
  return new Promise((resolve, reject) => {
    superagent.get(targetUrl)
    .end(function (err, res) {
      if (!err) {
        let result = [];
        var $ = cheerio.load(res.text);
        $('.post-list a').each(function (idx, element) {
            let href = `${targetUrl}${element.attribs.href}`;
            let title = $($(element).find('p')[0]).text();
            result.push({href, title});
        });
        console.log(result);
         resolve(result);
       } else {
        reject(err);
      }
    });
  });
}
module.exports  = function *(next) {
  let result = null;
  try {
    result = yield reptileFex()
    console.log(result);
  } catch (err) {
    console.log(err);
  }
  yield next;
}
