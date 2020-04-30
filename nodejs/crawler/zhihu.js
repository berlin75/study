var http = require('http');
var https = require('https');
var querystring = require('querystring');
var cheerio = require('cheerio');
var request = require('request');

// init();
function init(){
	var targetUrl = 'https://www.zhihu.com/question/34937418';
	https.get(targetUrl, (res) => {
		var chunks = [];
		res.on('data', (chunk) => {
			chunks.push(chunk);
		})
		res.on('end', () => {
			var $ = cheerio.load(Buffer.concat(chunks));
			var imgarr = $('.origin_image.zh-lightbox-thumb.lazy');
			var urlarr = [];
			imgarr.map((i, img) => {
				// if(imgarr[i] && imgarr[i].attribs && imgarr[i].attribs['data-actualsrc']){
				// 	urlarr.push(imgarr[i].attribs['data-actualsrc']);
				// }
				urlarr.push($(img).attr('data-actualsrc'));
			});
			console.log(urlarr.length);
			showToBowser(urlarr);
		})
	})
}

// ajaxMethod(20);
/* ajax请求 */
function ajaxMethod(offset){
	var path = querystring.unescape('api/v4/questions/34937418/answers?include=data%5B*%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Cquestion%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%2Cupvoted_followees%3Bdata%5B*%5D.mark_infos%5B*%5D.url%3Bdata%5B*%5D.author.follower_count%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=3&limit=20&sort_by=default');
	var options = {
		protocol: 'https:',
		hostname: 'www.zhihu.com',
		port: 443,
		path: path,
		method: 'GET',
		headers: {
			'accept':'application/json, text/plain, */*',
			'Accept-Encoding':'gzip, deflate, sdch, br',
			'Accept-Language':'zh-CN,zh;q=0.8',
			'authorization':'oauth c3cef7c66a1843f8b3a9e6a1e3160e20',
			'Connection':'keep-alive',
			'Cookie':'q_c1=41436971ac5b41caab418700be06d004|1509979018000|1509979018000; _zap=32aa4ad3-a657-4991-ba9b-c3e7f1591b24; l_cap_id="MGYwNWY2NDJjZTk0NGIyMjg0MjIxYTJiY2I3NjcwNzk=|1510326163|3ee0e36e0bcb12eb9cc7f8eaf14cd29ddaadc091"; r_cap_id="Y2I3N2E3MWQ3Njk4NGJjYTg1ODc3MTZmMTcwOTU2Nzc=|1510326163|9481c44433f6f18c9a749ba5605d64168d8c4051"; cap_id="YzJmZjliMWNiNDI3NDg3ZjlmY2VjNjdlYjE5NTljY2Q=|1510326163|b2fde6309b4390bb5f918d0445e848599f2f0088"; aliyungf_tc=AQAAALflQEhNCAMACLcCr86xXp9QWRgl; d_c0="AFBCRUqtqgyPThhYUJsRQ4ZnCCujCBDq-XA=|1510392364"; _xsrf=87799cec-375c-415e-bb5e-9c71e2376309',
			'Host':'www.zhihu.com',
			'Referer':'https://www.zhihu.com/question/34937418',
			'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
			'x-udid':'AFBCRUqtqgyPThhYUJsRQ4ZnCCujCBDq-XA='
		}
	};
	var ajaxUrl = 'https://www.zhihu.com/api/v4/questions/34937418/answers?include=data%5B*%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Cquestion%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%2Cupvoted_followees%3Bdata%5B*%5D.mark_infos%5B*%5D.url%3Bdata%5B*%5D.author.follower_count%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=3&limit=20&sort_by=default';
	var req = https.request(options, (res) => {
		console.log(res.statusCode);
		console.log(JSON.stringify(res.headers));
		res.setEncoding('utf8');
		var chunks = [];
		res.on('data', (chunk) => {
			chunks.push(chunk);
		})
		res.on('end', () => {
			console.log(JSON.parse(chunks.toString()));
		})
	})
	req.on('error', (err) => console.log(`request failed: ${err.message}`));
	req.end();
}

// getIAjaxUrlList(20);
/*每隔100毫秒模拟发送ajax请求，并获取请求结果中所有的图片链接*/
function getIAjaxUrlList(offset){
    request.post("https://www.zhihu.com/node/QuestionAnswerListV2")
            .set(config)
                .send("method=next&params=%7B%22url_token%22%3A34937418%2C%22pagesize%22%3A20%2C%22offset%22%3A" +offset+ "%7D&_xsrf=98360a2df02783902146dee374772e51")
                    .end(function(err,res){
                        if(err){
                            console.log(err);
                        }else{
                            var response=JSON.parse(res.text);/*想用json的话对json序列化即可，提交json的话需要对json进行反序列化*/
                            if(response.msg&&response.msg.length){
                                var $=cheerio.load(response.msg.join(""));/*把所有的数组元素拼接在一起，以空白符分隔，不要这样join()，它会默认数组元素以逗号分隔*/
                                var answerList=$(".zm-item-answer");
                                answerList.map(function(i,answer){
                                    var images=$(answer).find('.zm-item-rich-text img');
                                    images.map(function(i,image){
                                        photos.push($(image).attr("src"));
                                    });
                                });
                                setTimeout(function(){
                                    offset+=20;
                                    console.log("已成功抓取"+photos.length+"张图片的链接");
                                    getIAjaxUrlList(offset);
                                },100);
                            }else{
                                console.log("图片链接全部获取完毕，一共有"+photos.length+"条图片链接");
                                // console.log(photos);
                                return downloadImg(50);
                            }
                        }
                    });
}

function showToBowser(urlarr){
	var outHtml = '';
	urlarr.map((val, index, arr) => {
		outHtml += `<img src="${val}" title="${index+1}" style="width: 300px;"/>`;
	})
	http.createServer((req, res) => {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(outHtml);
		res.end();
	}).listen(8888)
	console.log('localhost:8888查看效果');
}
