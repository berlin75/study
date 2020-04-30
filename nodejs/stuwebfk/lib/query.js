// query.js 插件开发

// app.use(query);

var url = require("url"),
    querystring = require("querystring");

function query(req, res, next){
    var qs = url.parse(req.url).query; // 请求参数部分
    // 判断是否有参数
    if(qs) req.query = querystring.parse(qs);
    next();
}

module.exports = query;