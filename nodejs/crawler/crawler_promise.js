//并发控制，同时爬取多个课程信息
//怎么捕获异常

var http = require('http');
var cheerio = require('cheerio');
var baseurl = 'http://www.imooc.com/learn/'; 
var videoIds = [7288, 637, 348, 259];
// 数据结构
// coursesData = {
// 	title: title,
// 	number: number,
// 	videos: [
// 				{
// 					chapterTitle: '',
// 					videos: [{
// 						title: '', 
// 						id: ''
// 					}]
// 				},
// 			]
// }

function filterhtml(html){
	var $ = cheerio.load(html);
	var coursesData = {
		title: $('title').text().trim(),
		number: $($('.js-learn-num')[0]).text(),
		videos: []
	};
	var chapters = $('.chapter');
	chapters.each(function(item){
		var chapterTitle = $(this).find('strong').text().replace(/ {2,}/g, '').replace(/(\n)+/g, '-');
		var videos = $(this).find('.video').children('li');
		var chapterData = {
			chapterTitle: chapterTitle,
			videos: []
		};
		videos.each(function(item){
			var title = $(this).find('a').text().replace(/ {2,}/g, '').replace(/(\n)+/g, '');
			var id = $(this).find('a').attr('href').split('/video/')[1];
			chapterData.videos.push({
				title: title,
				id: id
			});
		});
		coursesData.videos.push(chapterData);
	});
	return coursesData;
}

function printit(allPagesData){
	allPagesData.forEach(function(pageData){
		console.log(`${pageData.number}人学过${pageData.title}`);
	});
	console.log(`\n\n`);
	allPagesData.forEach(function(pageData){
		console.log(`********${pageData.title}*************\n`);
		pageData.videos.forEach(function(item){
			console.log(item.chapterTitle);
			item.videos.forEach(function(video){
				console.log(` [${video.id}] ${video.title}`);
			})
			console.log('\n');
		});
	});
}

function getPageAsync(url){
	return new Promise(function(resolve, reject){
		console.log(`正在爬取${url}\n`);
		http.get(url, function(res){
			var html = '';
			res.on('data', data => html += data );
			res.on('end', function(){	
				resolve(html);	
			});
		}).on('error', function(){
			// reject(new Error(`抓取页面${url}错误`));
			throw new Error(`抓取页面${url}错误`);
		})
	})
}

var fetchCourseArray = [];
videoIds.forEach(function(id){
	fetchCourseArray.push(getPageAsync(baseurl + id));
});

Promise
	.all(fetchCourseArray)
	.then(function(pages){
		var allPagesData = [];
		pages.forEach(function(html){
			var coursesData = filterhtml(html);
			allPagesData.push(coursesData);
		});
		allPagesData.sort(function(a, b){
			return a.number < b.number;
		});
		printit(allPagesData);
	})
	.catch(function(error){ 
		console.log('error'+ error);
	})
