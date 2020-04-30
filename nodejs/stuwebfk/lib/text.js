// text.js 响应渲染文本

// var {App, static, post, query, text} = require("../.."); 
// app.use(text)
// app.get("/text",function(req,res){
//     res.text("<b>hello world</b>");
// })

module.exports = function(req,res,next){
    res.text = function(txt){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(txt);
        res.end();
    }
    next();
}