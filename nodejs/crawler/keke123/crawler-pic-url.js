var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');

fs.readFile('keke12345_2.json', function (err, data) {
   	if (err) return console.error(err);
   	var arrUrlList = JSON.parse(data.toString());
   	arrUrlList = arr_ext(arrUrlList, 10) // url添加后缀，获取分页内容,形成二维数组
   	// console.log(arrUrlList);
   	console.log('------------------抓取以上页面的图片----------------------------');
   	var arrPicUrlList = [];
   	arrUrlList.forEach(function(item, index) {
    	getPicUrl(arrPicUrlList, item);
  	})
	// fs.writeFile('keke12345_2_url_list.json', JSON.stringify(arrPicUrlList),  function(err) {
	//    if (err) return console.error(err);
	//    console.log("数据写入成功！");
	// });
});

//获取内容页和后缀页面的img地址
function getPicUrl(arrPicUrlList, urlarr){
	urlarr.forEach(function(item, index){
		http.get(item, function(res){
			var arrhtml = '';
			res.on('data', function(data){
				arrhtml += data;
			});
			res.on('end', function(){
				var $ = cheerio.load(arrhtml);
				var arrimg = [];
				var links = $('.page-list').find('img');
				for(var i in links){				
					if(/^\d+$/.test(i) && links[i].attribs){
						links[i] = links[i].attribs['src'];
					}
					if(/^\d+$/.test(i)){
						arrimg.push(links[i]);
					}
				}
				console.log(arrimg);		
				arrPicUrlList.push(arrimg);
				// console.log(`------------------一组图片${item}----------------------------`);
				return arrPicUrlList;
			});
		}).on('error', function(){
			console.log(`抓取页面出错：${item}`);
		})
	});	
}


function arr_ext(arrUrlList, max){
	//[[1,1-1,1-2],[2,2-1,2-2],[3,3-1,3-2]]	
	var arrUrlList_ext = [];
	arrUrlList.forEach(function(item, index){  // url添加后缀，获取分页内容,形成二维数组
		var arrtmp = [];
		arrtmp.push(item);
		for(var i = 2 ; i < max+1; i++){
			arrtmp.push(item.replace('.html', '_' + i + '.html'));
		}
		arrUrlList_ext.push(arrtmp);
	});
	return arrUrlList_ext;
}
