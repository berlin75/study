// 简单的http代理  
'use strict'
const http = require('http');
const request = require('request');

http.createServer((req, res) => {
  let reqUrl = req.url;
  req.pipe(request(reqUrl).on('error', err => {})).pipe(res)
}).listen(8888)