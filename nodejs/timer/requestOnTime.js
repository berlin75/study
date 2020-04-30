// nodejs模块 node-schedule使用,定时任务
// npm install node-schedule
// 比较坑的就是如果项目中有定时任务的时候,开启多线程模式就会执行多次,不管是这个模块还是使用 setInterval

var http     = require('http');  
var schedule = require("node-schedule"); 

function httpGet(){  
   var url = `http://127.0.0.1:8888/`;  
  http.get(url, function(res) {   
    console.log("访问127.0.0.1:8888状态码: " + res.statusCode);   
  }).on('error', function(e) {   
    console.log("访问127.0.0.1:8888 error: " + e.message);   
  });  
}  

setInterval(httpGet, 1000);

// 确定的时间执行
// var date = new Date(2016,6,13,15,50,0);  
// schedule.scheduleJob(date, function(){  
//   httpGet();  
// });  

// 秒为单位执行,如:每5秒执行一次
// var rule1     = new schedule.RecurrenceRule();  
// var times1    = [1,6,11,16,21,26,31,36,41,46,51,56];  
// rule1.second  = times1;  
// schedule.scheduleJob(rule1, function(){  
//   httpGet();  
// });  

// 以分为单位执行,如:每5分种执行一次
// var rule2     = new schedule.RecurrenceRule();  
// var times2    = [1,6,11,16,21,26,31,36,41,46,51,56];  
// rule2.minute  = times2;  
// schedule.scheduleJob(rule2, function(){  
//   httpGet();  
// });  


// 以小时为单位执行,如:每4小时执行一次
// var rule3     = new schedule.RecurrenceRule();  
// var times3    = [1,5,9,13,17,21];  
// rule3.hour  = times3;  
// schedule.scheduleJob(rule3, function(){  
//   httpGet();  
// });  

// 每分钟的5秒这个点执行
// schedule.scheduleJob('5 * * * * *', function(){  
//   httpGet();  
// }); 