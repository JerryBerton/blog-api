var superagent = require('superagent');
var cheerio = require('cheerio');

exports.getFex= function() {
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
         resolve(result);
       } else {
        reject(err);
      }
    });
});
}