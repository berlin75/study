var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348'; 

// 数据结构
// [{
// 	chapterTitle: '',
// 	videos: [{
// 		title: '', 
// 		id: ''
// 	}]
// }]

function filterhtml(html){
	var $ = cheerio.load(html);
	var chapters = $('.chapter');
	var contentdata = [];
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
		contentdata.push(chapterData);
	});
	return contentdata;
}

function printit(contentdata){
	contentdata.forEach(function(item){
		console.log(item.chapterTitle);
		item.videos.forEach(function(video){
			console.log(` [${video.id}] ${video.title}`);
		})
		console.log('\n');
	});
	
}

http.get(url, function(res){
	var html = '';
	res.on('data', function(data){
		html += data;
	});
	res.on('end', function(){		
		var contentdata = filterhtml(html);
		printit(contentdata);
	});
}).on('error', function(){
	console.log('获取数据错误');
})

