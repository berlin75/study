const http = require('http');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

var entryUrl = 'http://www.keke123.cc/gaoqing/list_5_3.html';
var basepath = './keke123-3/';

var basedir = basepath.split('/')[1];
fs.access(basedir, err => {
	if(err) fs.mkdirSync(basedir);
})

crawler();

//imgUrlArr创建文件夹，下载对应数组元素图片
function crawler(){
	http.get(entryUrl, res => {
		var chunks = [];
	  	res.on('data', chunk => chunks.push(chunk));
		res.on('end', () => {
			var topicArr = filterTags(chunks);
			// return console.log(topicArr);
			topicArr.forEach(topic => {
				var dir_name = basepath + topic.title;
				fs.access(dir_name, err => {
					if(err) fs.mkdirSync(dir_name);
					getPicUrl(topic.url, dir_name);
				})
			})
		});
	}).on('error', e => {
		console.log(`entryUrl error: ${e.message}! try again ${entryUrl}`); 
		crawler();
	})
}

function filterTags(html){
	// 将二进制数据解码成 gb2312 编码数据
	var html = iconv.decode(Buffer.concat(html), 'gb2312');
	var $ = cheerio.load(html, {decodeEntities: false});
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

// var testurl = 'http://www.keke123.cc/gaoqing/cn/wfltt/2018/0122/26751.html';
// getPicUrl(testurl, basepath);

// url添加后缀，获取分页内容
function getPageCount(pageurl){
	return new Promise((resolve, reject) => {
		var htmlUrlArr_ext = [pageurl];
		http.get(pageurl, res => {
			var chunks = [];
		  	res.on('data', chunk => chunks.push(chunk));
			res.on('end', () => {
				// 将二进制数据解码成 gb2312 编码数据
				var html = iconv.decode(Buffer.concat(chunks), 'gb2312');
				var $ = cheerio.load(html, {decodeEntities: false});
				var pageCount = $('.page')[0]['children'].length - 2; // 分页数
				for(var i=2; i <= pageCount; i++){
					htmlUrlArr_ext.push(pageurl.replace(`.html`, `_${i}.html`));
				}
				resolve(htmlUrlArr_ext);
			});
		}).on('error', () => reject(`getPageCount error：${pageurl}!`))
	})
}

function getPicUrl(pageurl, dir_name){ 
	getPageCount(pageurl).then(urlArr => {
		urlArr.forEach(item => {
			http.get(item, res => {
				var chunks = [];
			  	res.on('data', chunk => chunks.push(chunk));
				res.on('end', () => {
					// 将二进制数据解码成 gb2312 编码数据
					var html = iconv.decode(Buffer.concat(chunks), 'gb2312');
					var $ = cheerio.load(html, {decodeEntities: false});
					var links = $('.page-list').find('img');
					for(var i in links){				
						if(/^\d+$/.test(i) && links[i].attribs){
							downloadpic(links[i].attribs['src'], dir_name)
						}
					}					
				});
			}).on('error', () => console.log(`getPicUrl error：${item}!`))
		})	
	}).catch(e => console.log(e));
}


// var imgSrc = 'http://pickeke3.ke12345.net/picss/2017/allimg/171012/12114523-1-463964.jpg';
// downloadpic(imgSrc, './new');

function downloadpic(imgSrc, dirName){
	function startDownloadTask(){
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
