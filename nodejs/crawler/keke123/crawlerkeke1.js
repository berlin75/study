const http = require('http');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
// iconv.decode(Buffer.concat(chunks), 'gb2312'); // 将二进制数据解码成gb2312编码数据

var index = 9;
var initUrl = 'http://www.keke123.cc/gaoqing/list_5_' + index + '.html';
var basepath = './keke123-' + index + '/';

var basedir = basepath.split('/')[1];
fs.access(basedir, err => err && fs.mkdirSync(basedir))

init();

function init(){
	http.get(initUrl, res => {
		var chunks = [];
	  	res.on('data', chunk => chunks.push(chunk));
		res.on('end', () => {
			var topicArr = filterTags(chunks);
			topicArr.reduce((chain, topic) => {   
		        return chain.then(() => crawler(topic));
		    }, Promise.resolve());
		});
	}).on('error', err => {
		console.log(`initUrl error: ${err.message}! try again ${initUrl}`); 
		init();
	})
}

function crawler(topic){
	return new Promise((resolve, reject) => {
		var dir_name = basepath + topic.title;
		fs.access(dir_name, err => {
			if(err) fs.mkdirSync(dir_name);
			down(topic.url, dir_name)
			resolve();
		})
	})
}

function filterTags(html){
	var $ = cheerio.load(iconv.decode(Buffer.concat(html), 'gb2312'), {decodeEntities: false});
	var htmlUrlArr = [];
	var links = $('#msy').find('.title');
	for(var i in links){
		if(/^\d+$/.test(i) && links[i].children && links[i].children[0] && links[i].children[0].attribs){
			htmlUrlArr.push({
				title: links[i].children[0].attribs['title'],
				url: links[i].children[0].attribs['href']
			});
		}	
	}
	return htmlUrlArr;
}

// url添加后缀,获取分页内容
function getPageCount(pageurl){
	return new Promise((resolve, reject) => {
		var pageUrls = [pageurl];
		http.get(pageurl, res => {
			var chunks = [];
		  	res.on('data', chunk => chunks.push(chunk));
			res.on('end', () => {
				var $ = cheerio.load(iconv.decode(Buffer.concat(chunks), 'gb2312'), {decodeEntities: false});
				var pageCount = $('.page')[0]['children'].length - 2; // 分页数
				for(var i=2; i <= pageCount; i++){
					pageUrls.push(pageurl.replace(`.html`, `_${i}.html`));
				}
				resolve(pageUrls);
			});
		}).on('error', () => reject(`getPageCount error：${pageurl}!`))
	})
}

// 解析主题的每个单页面的图片
function downSigle(siglePageUrl, dirName){
	http.get(siglePageUrl, res => {
		var chunks = [];
	  	res.on('data', chunk => chunks.push(chunk));
		res.on('end', () => {
			var $ = cheerio.load(iconv.decode(Buffer.concat(chunks), 'gb2312'), {decodeEntities: false});
			var links = $('.page-list').find('img');
			for(var i in links){				
				if(/^\d+$/.test(i) && links[i].attribs) 
					downloadpic(links[i].attribs['src'], dirName);
			}
		});
	}).on('error', () => console.log(`down error：${siglePageUrl}!`))
}

// 下载主题的所有图片
function down(pageurl, dirName){ 
	getPageCount(pageurl).then(pageUrls => {
		pageUrls.forEach(item => downSigle(item, dirName));
	}).catch(e => console.log(e))
}

function downloadpic(imgSrc, dirName){
	var startDownloadTask = function(){
    	var req = http.request(imgSrc, res => {
      		var fileBuff = [];
      		res.on('data', chunk => fileBuff.push(new Buffer(chunk)));
      		res.on('end', () => {
        		var totalBuff = Buffer.concat(fileBuff);
        		var contentLength = parseInt(res.headers['content-length']);
        		if (isNaN(contentLength)) return console.log(imgSrc + " content length error");
        		if (totalBuff.length < contentLength) {
          			console.log(imgSrc + " download error, try again");
          			startDownloadTask();
          			return;
        		}
        		fs.appendFile(dirName + "/" + path.basename(imgSrc), totalBuff, function(err){});
        		console.log("√ downloaded: " + imgSrc);
      		});
    	});
   		req.on('error', function(e){
      		console.log("× Try again: " + imgSrc);
      		startDownloadTask();
    	});
    	req.end();
  	}
    startDownloadTask();
}
