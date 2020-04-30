//爬取图片 http://www.keke123.cc

var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');
var url = 'http://www.keke123.cc/gaoqing/list_5_2.html';

http.get(url, function(res){
	var html = '';
	res.on('data', function(data){
		html += data;
	});
	res.on('end', function(){
		filterTags(html);
	});
}).on('error', function(){
	console.log(`抓取页面出错：${url}`);
})

function filterTags(html){
	var $ = cheerio.load(html);
	var arr = [];
	var links = $('#msy').find('.title');
	for(var i in links){
		if(links[i].children && links[i].children[0] && links[i].children[0].attribs){
			links[i] = links[i].children[0].attribs['href'];
		}	
		if(/^\d+$/.test(i)){
			arr.push(links[i]);
		}
	}
	console.log(arr);
	fs.writeFile(`keke12345_2.json`, JSON.stringify(arr),  function(err) {
	   if (err) return console.error(err);
	   console.log("数据写入成功！");
	});
	return arr;
}