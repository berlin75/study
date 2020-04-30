var http = require('http');

/*
循环的过程中http.get做的事情不过是把请求推送到某个队列，是立即返回的。  
底层有个线程帮你把队列中的request拉出来发给host，
然后得到响应后（这里有延时）最终再去回调那些事件函数
*/

for(var i = 0; i < 10; i ++) {
	(
		function(i){
			var req = http.get({host:'www.baidu.com', port:80, path:'/',agent:false},function(res) {
			    resultdata = '';
			    res.on('data',function(chunk) {
			        resultdata += chunk;
			    });

			    res.on('end',function() {
			    	console.log(i)
			        console.log('return ' + resultdata.length);
			    });
			});

			req.on('error',function(err) {
			    console.log('problem with request: ' + err.message);
			});
		}
	)(i)
}

/* 顺序请求 */
function seqRequest(i,limit){
	var req = http.get('http://localhost/study/',function(res) {
	    resultdata = '';
	    res.on('data',function(chunk) {
	        resultdata += chunk;
	    });

	    res.on('end',function() {
	    	console.log(i)
	        console.log('return ' + resultdata.length);
	        if(i<limit){
	        	seqRequest(i+1,limit)
	        }
	    });
	});

	req.on('error',function(err) {
	    console.log('problem with request: ' + err.message);
	});
}

seqRequest(0,10)

for(var i = 0; i < 1000000; i ++) {
(
    console.log(i);
    function(i){
        var req = http.get({host:'www.baidu.com', port:80, path:'/',agent:false},function(res) {
            resultdata = '';
            res.on('data',function(chunk) {
                resultdata += chunk;
            });

            res.on('end',function() {
                console.log(i)
                console.log('return ' + resultdata.length);
            });
        });

        req.on('error',function(err) {
            console.log('problem with request: ' + err.message);
        });
    }
)(i)}