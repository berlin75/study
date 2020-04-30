const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const index = 8;
const startPage = 'http://www.keke123.cc/gaoqing/list_5_' + index + '.html';
const basedir = 'keke123-' + index;
const basepath = path.join(__dirname, basedir);

let allTopics = [];
let lostUrl = [];

function parsePage(pageUrl, isGb2312, callback){
	return new Promise((resolve, reject) => {
		const {host, port, path} = url.parse(pageUrl);
	    var options = {
	        host: host,
	        port: port,
	        method: 'GET',
	        path: path
	    };
		http.get(options, res => { 
			// console.log(res.headers); 
			if(res.statusCode == 404){ 
				return console.error(`404: ${pageUrl}`); 
			}else if(res.statusCode !== 200){
		  		console.log(`× parsePage error: ${pageUrl}, statusCode: ${res.statusCode}, Try again!`);
		  		return parsePage(pageUrl, isGb2312, callback);
		  	}
	  		let chunks = [];
	  		res.on('data', chunk => chunks.push(new Buffer(chunk)));
	  		res.on('end', () => {
	  			let result = isGb2312 
	  				? cheerio.load(iconv.decode(Buffer.concat(chunks), 'gb2312'), {decodeEntities: false}) 
	  				: Buffer.concat(chunks);
	  			callback ? resolve(callback(result)) : resolve(result);
	  		})
	  		res.on('error', err => {  
			    // 访问的错误处理,注意,这里是无法得到类似于无法连接的错误  
			    if(err) console.error('res error', err,message);
			});
	  	}).on('error', err => {
	  		// 错误处理,处理res无法处理到的错误
	  		console.error(`× parsePage error: ${pageUrl}, Error: ${err.message}, Try again!`);
	  		// 页面超时延时处理
	  		if(err.code == 'ECONNRESET' || err.code == 'ETIMEDOUT'){
	  			parsePage(pageUrl, isGb2312, callback);
	  		}
	  		if(err.code == 'ENOTFOUND') reject(err.message);
		});
	})
}

function parsePage1(pageUrl, isGb2312, callback){
	return new Promise((resolve, reject) => {
	    let request_timer = null;
	    let req = null;
		// 请求5秒超时
		request_timer = setTimeout(() => {
		    req.abort();
		    console.log(`*** Request ${pageUrl} Timeout 5s`);
		}, 5000);

	    req = http.get(pageUrl, res => {
	        clearTimeout(request_timer);
	        // 等待响应60秒超时
		    var response_timer = setTimeout(() => {
		        res.destroy();
		        console.log(`*** Response ${pageUrl} Timeout 5s`);
		    }, 60000);
		    console.log("Got response: " + res.statusCode);

	        // console.log(res.headers); 
			// if(res.statusCode == 404){ 
			// 	return console.error(`404: ${pageUrl}`); 
			// }else if(res.statusCode !== 200){
		 //  		console.log(`× parsePage error: ${pageUrl}, statusCode: ${res.statusCode}, Try again!`);
		 //  		return parsePage(pageUrl, isGb2312, callback);
		 //  	}
	  		let chunks = [];
	  		let length = 0;
	  		res.on('data', chunk => chunks.push(new Buffer(chunk)));
	  		res.on('end', () => {
	  			clearTimeout(response_timer);
	  			let result = isGb2312 
	  				? cheerio.load(iconv.decode(Buffer.concat(chunks), 'gb2312'), {decodeEntities: false}) 
	  				: Buffer.concat(chunks);
	  			callback ? resolve(callback(result)) : resolve(result);
	  		})
	    }).on('error', err => {
	  		// 错误处理,处理res无法处理到的错误
	  		// 响应头有错误
		    clearTimeout(request_timer);
	  		console.error(`× parsePage error: ${pageUrl}, Error: ${err.message}, Try again!`);
	  		// 页面超时延时处理 socket hang up
	  		// if(err.code == 'ECONNRESET' || err.code == 'ETIMEDOUT'){
	  		// 	parsePage(pageUrl, isGb2312, callback);
	  		// }
	  		// if(err.code == 'ENOTFOUND') reject(err.message);
		});
    })
}

// 获取单个主题所有分页,url添加后缀
async function getExtPage(firstPage){
	let urls = [firstPage];
	let $ = await parsePage(firstPage, true);
	let pageCount = $('.page')[0]['children'].length - 2; // 分页数
	for(let i=2; i <= pageCount; i++){
		urls.push(firstPage.replace(`.html`, `_${i}.html`));
	}
	return urls;

	// parsePage(firstPage, true, $ => {
	// 	let pageCount = $('.page')[0]['children'].length - 2; // 分页数
	// 	for(let i=2; i <= pageCount; i++){
	// 		urls.push(firstPage.replace(`.html`, `_${i}.html`));
	// 	}
	// 	return urls;
	// });
}

// 解析每个单页面上的图片地址
async function getPicUrls(PageUrl){
	let $ = await parsePage(PageUrl, true).catch(err => console.error(err.message));
	let links = Array.from($('.page-list').find('img'));
	let picUrls = [];
	for(let link of links){
		picUrls.push(link.attribs['src']);
	}
	return picUrls;
}

async function getAlltopics(){
	let $ = await parsePage(startPage, true).catch(err => console.error(err.message));
	let links = Array.from($('#msy').find('.title')); 
	for(let link of links){
		let attr = link.children[0].attribs;
		let urls = await getExtPage(attr.href);
		let pics = [];
		urls.forEach(async PageUrl => {
			let picUrls = await getPicUrls(PageUrl);
			picUrls.forEach(picUrl => pics.push(picUrl));
		})
		allTopics.push({title: attr.title, urls: urls, pics: pics});
	}
}

// downloadpic('http://pic.keke12345.info/picss/2018/allimg/180202/02204Z4-1-16208.jpg', './keke123-21')
// .then(r => console.log(r))
// .catch(e => console.log(e))
async function downloadpic(pic, dirName){
	return new Promise((resolve, reject) => {
		// let fileBuff = await parsePage(pic, false);
		// fs.writeFile(path.join(dirName, path.basename(pic)), fileBuff, 'binary', err => {
		// 	if(err) return console.error(err.message);
		// 	// console.log("√ downloaded: " + pic);
		// 	resolve(true);
		// });

		http.get(pic, res => {
			if (res.statusCode !== 200) return reject(`downloadpic res error  ${res.statusCode}: ${pic}`);
			res.pipe(fs.createWriteStream(path.join(dirName, path.basename(pic)))).on('close', () => {
	          resolve(true)
	        }); 
			res.on('end', () => {
				// console.log("√ downloaded: " + pic);
				// resolve(true);
			})
		}).on('error', err => reject(`downloadpic req ${err.message}: ${pic}`))
	})
}

async function init(i){
	const time = new Date(); 
	await getAlltopics();
	allTopics = allTopics.slice(28);  // 分段测试
	// console.log(allTopics); return;
	fs.access(basedir, err => err && fs.mkdirSync(basedir));

	let topicLen = allTopics.length;
	let limit = topicLen;
	console.log(`index: ${index},topic quantitation：${topicLen}`);

	function downTopic(i){
		let topic = allTopics[i];
		let dirName = path.join(basepath, topic.title);
		fs.access(dirName, err => err && fs.mkdirSync(dirName)); 
		let fileCount = topic.pics.length;
		let fileTotal = fileCount;

		console.log(`+++ 开始下载: ${topic.title}`);
		Promise.all(topic.pics.map(async pic => {
			let isDowned = await downloadpic(pic, dirName).catch(err => {console.error(err)});
			if(isDowned) fileCount--;
			if(!fileCount){
				console.log(`=== 已完成下载: ${topic.title}`);
				topicLen--;
			}
			if(!topicLen){
				console.log(`\nGAME OVER! 起始时间：${time.toLocaleString()}, 结束时间：${new Date().toLocaleString()}! `);
			}
		})).then(() => {
			i++;
			if(i < limit) downTopic(i);
		})
	}

	downTopic(i);

	// for(let topic of allTopics){
	// 	let dirName = path.join(basepath, topic.title);
	// 	fs.access(dirName, err => err && fs.mkdirSync(dirName)); 
	// 	let fileCount = topic.pics.length;
	// 	let fileTotal = fileCount;

	// 	console.log(`+++  开始下载: ${topic.title}`);
	// 	await Promise.all(topic.pics.map(async pic => {
	// 		let isDowned = await downloadpic(pic, dirName).catch(err => {console.error(err)});
	// 		if(isDowned) fileCount--;
	// 		if(!fileCount){
	// 			console.log(`=== 已完成下载: ${topic.title}`);
	// 			topicLen--;
	// 		}
	// 		if(!topicLen){
	// 			console.log(`\nGAME OVER! 起始时间：${time.toLocaleString()}, 结束时间：${new Date().toLocaleString()}! `);
	// 		}
	// 	}))
	// }
}

init(0);

