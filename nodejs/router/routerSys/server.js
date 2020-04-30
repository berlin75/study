var http = require('http');

function start(router) {
    http.createServer(function(request, response) {
        router.init(request, response);
    }).listen(8888);
    console.log('Server 127.0.0.1:8888 starting');
}

exports.start = start;