const http = require('http');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

// 将二进制数据解码成gb2312编码数据
function togb2312(chunks){
	return cheerio.load(iconv.decode(Buffer.concat(chunks), 'gb2312'), {decodeEntities: false});
}

var index = 22;
var getAlltopicsUrl = 'http://www.keke123.cc/gaoqing/list_5_' + index + '.html';
var basepath = './keke123-' + index + '/';
var basedir = basepath.split('/')[1];
fs.access(basedir, err => err && fs.mkdirSync(basedir))

var allTopics = [];

async function init(){
	const time = new Date();
	allTopics = await getAlltopics();
	var topicLen = allTopics.length;
	console.log(`index: ${index},topic quantitation：${allTopics.length}`);
	for(let topic of allTopics){
		let dirName = basepath + topic.title;
		fs.access(dirName, err => err && fs.mkdirSync(dirName));
		let fileCount = topic.pics.length;
		let fileTotal = fileCount;
		console.log(`+++  开始下载: ${topic.title}`);
		for(let imgSrc of topic.pics){
			await downloadpic(imgSrc, dirName);
			fileCount--;
			if(!fileCount){
				console.log(`=== 已完成下载: ${topic.title} ===`);
				topicLen--;
			}
			if(!topicLen){
				let finish = `GAME OVER! start at ${time} finish at ${new Date()}`;
				console.log('log:' + finish)
				return finish;
			}
		}
	}
}

init().then(done => console.log(done));


function getAlltopics(){
  return new Promise((resolve, reject) => {
	http.get(getAlltopicsUrl, res => {
		var chunks = [];
	  	res.on('data', chunk => chunks.push(chunk));
		res.on('end', () => {
			filterTags(chunks);
			allTopics = allTopics.slice(0,2) 
			let len = allTopics.length;
			allTopics.forEach((topic, index1) => {
				topic.pics = [];
				getPageCount(topic).then(topic => {
					let len2 = topic.urls.length;
					topic.urls.forEach((siglePageUrl, index2) => {
						getPicOfSiglePage(siglePageUrl).then(picArr => {
							picArr.forEach(item => topic.pics.push(item));
							if(len - 1 == index1 && len2 -1 == index2) resolve(allTopics);
						}).catch(err => console.error(err))
					})
				}).catch(err => console.error(err))
			})
		});
	}).on('error', err => {
		console.error(`getAlltopicsUrl error: ${err.message}! try again ${getAlltopicsUrl}`); 
		getAlltopics();
	})
  })
}

function filterTags(html){
	var $ = togb2312(html);
	var links = $('#msy').find('.title');
	for(var i in links){
		if(/^\d+$/.test(i) && links[i].children && links[i].children[0] && links[i].children[0].attribs){
			var urls = [];
			urls.push(links[i].children[0].attribs['href']);
			allTopics.push({title: links[i].children[0].attribs['title'], urls: urls});
		}	
	}
}

// 获取单个主题所有分页,url添加后缀
function getPageCount(topic){
	return new Promise((resolve, reject) => {
		http.get(topic.urls[0], res => {
			var chunks = [];
		  	res.on('data', chunk => chunks.push(chunk));
			res.on('end', () => {
				var $ = togb2312(chunks);
				var pageCount = $('.page')[0]['children'].length - 2; // 分页数
				for(var i=2; i <= pageCount; i++){
					topic.urls.push(topic.urls[0].replace(`.html`, `_${i}.html`));
				}
				resolve(topic);
			});
		}).on('error', () => reject(`getPageCount error：${topic.title}!`))
	})
}

// 解析每个单页面上的图片地址
function getPicOfSiglePage(siglePageUrl){
	return new Promise((resolve, reject) => {
		http.get(siglePageUrl, res => {
			var chunks = [];
		  	res.on('data', chunk => chunks.push(chunk));
			res.on('end', () => {
				var $ = togb2312(chunks);
				var links = $('.page-list').find('img');
				var picUrls = [];
				for(var i in links){				
					if(/^\d+$/.test(i) && links[i].attribs) picUrls.push(links[i].attribs['src']);
				}
				resolve(picUrls);
			});
		}).on('error', () => {
			console.error(`down error：${siglePageUrl}! try again`);
			getPicOfSiglePage(siglePageUrl);
		})
	})
}

function downloadpic(imgSrc, dirName){
	return new Promise((resolve, reject) => {
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
	          			console.log(`contentLength err: ${totalBuff.toString()}`)
	          			startDownloadTask();
	          			return;
	        		}
	        		fs.appendFile(dirName + "/" + path.basename(imgSrc), totalBuff, function(err){});
	        		console.log("√ downloaded: " + imgSrc);
	        		resolve();
	      		});
	    	});
	   		req.on('error', function(e){
	      		console.log("× Try again: " + imgSrc);
	      		startDownloadTask();
	    	});
	    	req.end();
	  	}
	    startDownloadTask();
	})
}