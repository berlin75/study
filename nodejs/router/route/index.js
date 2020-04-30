/* index.js */
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');
var handle = { 
	"/":  requestHandlers.start,  
	"/start":  requestHandlers.start,   // 将不同的URL映射到相同的请求处理程序上
	"/upload":  requestHandlers.upload 
};
  
server.start(router.route, handle);
