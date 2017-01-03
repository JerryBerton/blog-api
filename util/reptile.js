let Cache = require('../util/cache.js');
let client = new Cache();
let superagent = require('superagent');
let cheerio = require('cheerio');
let url = {
  cnode: 'https://cnodejs.org',
  w3ctech: 'https://www.w3ctech.com'
}
// 爬虫 w3ctech 社区列表
module.exports.arrestList = function () {
  return new Promise((resolve, reject) => {
    superagent.get(url.w3ctech + '/topic/index')
    .end(function (err, res) {
      if (!err) {
        let result = [];
        let $ = cheerio.load(res.text);
        $('#topic-list .topic_list_content').each(function(idx, element) {   
          let parent = $(element).children().filter('.topic_content')[0];
          let child_a = $(parent).find('a');
          let child_img = $(parent).find('img');
          let child_number = $(parent).find('.number');
           result.push({
             id: idx,
             description: $(child_a[1]).text(),
             visits: $(child_number[0]).text(),
             title: $(child_a[0]).text(),
             author: $(child_img[0]).attr('title'),
             href: url.w3ctech + $(child_a[0]).attr('href'),
             time: new Date($(child_a[2]).attr('title')),
           });
        });
         resolve(result);
       } else {
        reject(err);
      }
    });
  });
}
// 爬虫 w3ctech 社区 详细信息
module.exports.arrestDetail = function (url) {
  return new Promise((resole, reject) => {
    superagent.get(url)
    .end(function(err, res) {
      if (!err) {
       let $ = cheerio.load(res.text);
       $('#bd .wx_qrcode_box').remove();
       let content = $('#bd .callout').html();
       let title = $('.topic_info h1').text();
       let author = $('.topic_user img').attr('title');
       let desc = [];
       $('.topic_category_list li').each(function(idx, element) {
          desc.push($(element).text());
       });
       let visits = $($('.meta li')[2]).text();
       let time = $('.meta .topic_date').attr('title');
       let result = {
         title,
         time: new Date(time),
         origin: url,
         description: desc.join('、'),
         visits: parseInt(visits.slice(0, visits.length - 4)),
         author,
         content,
       }
       resole(result);
      } else {
        reject(err);
      }
    }) 
  });
}