const http = require('http');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

var indexUrl = 'http://www.keke123.cc/gaoqing/list_5_2.html';

crawlerIndex(indexUrl,"./new/");

//列表页获取内容页url,并添加后缀成数组
// var htmlUrlArr = ["http://www.keke123.cc/25797.html","http://www.keke123.cc/25796.html"]

// var htmlUrlArr_ext = [
// 	["http://www.keke123.cc/25797.html","http://www.keke123.cc/25797_2.html","http://www.keke123.cc/25797_3.html"],
// 	["http://www.keke123.cc/25796.html","http://www.keke123.cc/25796_2.html","http://www.keke123.cc/25796_3.html"]
// ]

//内容页获取图片url
// var imgUrlArr = [
// 	["http://pickeke3.ke12345.net/1722120041-1-1MM9.jpg","http://pickeke3.ke12345.net/1722120041-1-1X911.jpg","http://pickeke3.ke12345.net/1722120041-1-212010.jpg"],
// 	["http://pickeke3.ke12345.net/1722120041-1-1MM9.jpg","http://pickeke3.ke12345.net/1722120041-1-1X911.jpg","http://pickeke3.ke12345.net/1722120041-1-212010.jpg"]
// ]

//imgUrlArr创建文件夹，下载对应数组元素图片
function crawlerIndex(indexUrl, basepath){
	http.get(indexUrl, function(res){
		var html = '';
		res.on('data', data =>	html += data );
		res.on('end', function(){
			var htmlUrlArr = filterTags(html);
			// var htmlUrlArr_ext = arr_ext(htmlUrlArr, 10);
			htmlUrlArr.forEach(function(pageurl, index){
				var dir_name = pageurl.replace('http://','').replace(/\//g,'-');
				fs.mkdir("./keke123_img/"+ dir_name, function(err){
					if(err) console.log(`创建目录失败！error：${err.message}`);
					else getPicUrl(pageurl, basepath+ dir_name);
				});
		   		
			})
		});
	}).on('error', () => {
		console.log(`爬取页面出错：${indexUrl}! try again`); 
		crawlerIndex(indexUrl);
	})
}

function filterTags(html){
	var $ = cheerio.load(html);
	var htmlUrlArr = [];
	var links = $('#msy').find('.title');
	for(var i in links){
		if(/^\d+$/.test(i) && links[i].children && links[i].children[0] && links[i].children[0].attribs){
			links[i] = links[i].children[0].attribs['href'];
			htmlUrlArr.push(links[i]);
		}	
	}
	return htmlUrlArr;
}

function arr_ext(pageurl, max){  // url添加后缀，获取分页内容
	//[[1,1-1,1-2],[2,2-1,2-2],[3,3-1,3-2]]	
	var htmlUrlArr_ext = [];
	max = max || 10;
	htmlUrlArr_ext.push(pageurl);
	for(var i = 1 ; i < max+1; i++){
		htmlUrlArr_ext.push(pageurl.replace('.html', '_' + i + '.html'));
	}
	return htmlUrlArr_ext;
}

//获取内容页的img地址
function getPicUrl(pageurl, dir_name){
	var htmlUrlArr_ext = arr_ext(pageurl, 10);
	htmlUrlArr_ext.forEach(function(item, index){
		http.get(item, function(res){
			var arrhtml = '';
			res.on('data', function(data){
				arrhtml += data;
			});
			res.on('end', function(){
				var $ = cheerio.load(arrhtml);
				var links = $('.page-list').find('img');
				for(var i in links){				
					if(/^\d+$/.test(i) && links[i].attribs){
						downloadpic(links[i].attribs['src'], dir_name)
					}
				}					
			});
		}).on('error', function(){
			console.log(`抓取页面出错：${pageurl}!`);
		})
	})	
}

function downloadpic(imgSrc, dir_name) {
  function getHttpReqCallback(imgSrc, dirName) {
    var fileName = path.basename(imgSrc);
    var callback = function(res) {
      console.log("request: " + imgSrc + " return status: " + res.statusCode);
      var contentLength = parseInt(res.headers['content-length']);
      var fileBuff = [];
      res.on('data', function (chunk) {
        var buffer = new Buffer(chunk);
        fileBuff.push(buffer);
      });
      res.on('end', function() {
        console.log("end downloading " + imgSrc);
        if (isNaN(contentLength)) {
          console.log(imgSrc + " content length error");
          return;
        }
        var totalBuff = Buffer.concat(fileBuff);
        // console.log("totalBuff.length = " + totalBuff.length + " " + "contentLength = " + contentLength);
        if (totalBuff.length < contentLength) {
          console.log(imgSrc + " download error, try again");
          startDownloadTask(imgSrc, dirName);
          return;
        }
        fs.appendFile(dirName + "/" + fileName, totalBuff, function(err){});
      });
    };

    return callback;
  }

  var startDownloadTask = function(imgSrc, dirName) {
    console.log("start downloading " + imgSrc);
    var req = http.request(imgSrc, getHttpReqCallback(imgSrc, dirName));
    req.on('error', function(e){
      console.log("request " + imgSrc + " error, try again");
      startDownloadTask(imgSrc, dirName);
    });
    req.end();
  }

    startDownloadTask(imgSrc, dir_name);
};