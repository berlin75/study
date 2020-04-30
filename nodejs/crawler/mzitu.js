var http = require('http');
var fs = require('fs');
var url = require('url');

function options(uri){
  var uriObj = url.parse(uri);
  return {
      hostname: uriObj.host,
      port: uriObj.port || 80,
      path: uriObj.pathname,
      method:"GET",
      headers:{
          "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Encoding":"gzip, deflate, sdch",
          "Accept-Language":"zh-CN,zh;q=0.8",
          "Cache-Control":"max-age=0",
          "Connection":"keep-alive",
          "Cookie":"Hm_lvt_dbc355aef238b6c32b43eacbbf161c3c=1518105863; Hm_lpvt_dbc355aef238b6c32b43eacbbf161c3c=1518105863",
          "Host":"www.mzitu.com",
          "If-Modified-Since":"Wed, 07 Feb 2018 17:44:47 GMT",
          "Upgrade-Insecure-Requests":"1",
          "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36",
      }
  }
}
  
function Mzitu(options) {
  this.id = 1;
    
  this.initialize.call(this, options);
  return this;
}
  
Mzitu.prototype = {
  constructor: Mzitu,
  initialize: function _initialize(options) {
    this.baseUrl = options.baseUrl;
    this.dir = options.dir || '';
    this.reg = options.reg;
    this.total = options.total;
    this.page = options.from || 1;
  },
  start: function _start() {
    this.getPage();
  },
  getPage: function _getPage() {
    var self = this,
      data = null;
    if (this.page <= this.total) { 
      http.get(options(this.baseUrl + this.page + '/'), function (res) {
        console.log(res.statusCode, res.headers);
        res.setEncoding("utf8");
        res.on('data', function (chunk) {
          data += chunk;
        }).on('end', function () {
          self.parseData(data);
        });
      });
    }
  },
  parseData: function _parseData(data) {
    var res = [],
      match;
    while ((match = this.reg.exec(data)) != null) {
      res.push(match[1]);
    }
    console.log(data, res);
    this.download(res);
  },
  download: function _download(resource) {
    var self = this,
      currentPage = self.page;
  
    resource.forEach(function (src, idx) {
      var filename = src.substring(src.lastIndexOf('/') + 1),
        writestream = fs.createWriteStream(self.dir + filename);
        
      http.get(options(src), function (res) {
        res.pipe(writestream);
      });
  
      writestream.on('finish', function () {
        console.log('page: ' + currentPage + ' id: ' + self.id++ + ' download: ' + filename);
      });
    });
      
    self.page++;
    self.getPage();
  }
};

var mzitu = new Mzitu({
  baseUrl: 'http://www.mzitu.com/zipai/comment-page-',
  dir: './mzitu/',
  reg: /<img\s*src="(.*?)"\s*alt=".*"\s*\/>/g,
  total: 1, // 141
  from: 1
});
  
mzitu.start();