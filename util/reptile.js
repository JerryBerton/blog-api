let Cache = require('../util/cache.js');
let client = new Cache();
let superagent = require('superagent');
let cheerio = require('cheerio');
let url = {
  cnode: 'https://cnodejs.org'
}
// 爬虫cnode社区列表
module.exports.cnodeList = function () {
  return new Promise((resolve, reject) => {
    superagent.get(url.cnode + '?tab=share')
    .end(function (err, res) {
      if (!err) {
        let result = [];
        let $ = cheerio.load(res.text);
        $('#topic_list .cell').each(function(idx, element) {   
           let _span = $(element).find('.count_of_visits')[0]
           let _a = $(element).find('.topic_title')[0];
           result.push({
             id: idx,
             type: 'cnode社区',
             visits: parseInt($(_span).text()),
             title: $(_a).attr('title'),
             href: url.cnode + $(_a).attr('href')
           });
        });
         resolve(result);
       } else {
        reject(err);
      }
    });
  });
}
// 爬虫cndoe 社区 详细信息
module.exports.cnodeDetail = function (url) {
  return new Promise((resole, reject) => {
    superagent.get(url)
    .end(function(err, res) {
      if (!err) {
        let $ = cheerio.load(res.text);
        $(".put_good").remove();
        let title = $(".topic_full_title").text();
        let content = $(".markdown-text").html();
       let result = {
         url, 
         title: title.trim(),
         content,
        
       }
       resole(result);
      } else {
        reject(err);
      }
    }) 
  });
}