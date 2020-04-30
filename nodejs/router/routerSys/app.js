var server = require('./server');
var router = require('./route');

router.setRootPath(__dirname);

router.get('/', function(req, res){
    router.sendFile(res, "/view/index.html");
});//处理/的get请求

server.start(router);