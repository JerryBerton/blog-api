'use strtic';
var superagent = require('superagent');
var cheerio = require('cheerio');
var targetUrl = 'https://cnodejs.org/';
module.exports.hello = function *() {
  superagent.get(targetUrl)
  .end(function (err, res) {
    var $ = cheerio.load(res.text);
    $('#topic_list .topic_title').each(function (idx, element) {
      console.log($(element).attr('title'))
    });
  });
  this.body = this.request.body;
}