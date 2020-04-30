// child.js 子进程接收一个server对象
var Server = require("net").Server;
process.on("message", (msg, server) => {
    console.log(server instanceof Server); // true
})