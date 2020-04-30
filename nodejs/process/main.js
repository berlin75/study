var cdr = require("child_process");
var http = require("http");
var server = http.createServer();
var cp = cdr.fork(__dirname+"/child");
server.listen(8888, () => {
    cp.send('server', server);
})