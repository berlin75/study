var {App, static, post, query} = require("../..");  // 默认执行的模块
var fs = require('fs');
var app = new App;

app.use(static(__dirname+"/public"));
app.use(post);
app.use(query);

// 定义路由规则和处理函数
app.post("/post",function(req,res){
    console.log(typeof req.body.fileName, req.body.fileName);
    // fs.writeFileSync(req.body.fileName, req.files.img);
    res.write("upload ok!");
    res.end();

})

app.get("/post",function(req,res){
    res.write("get success!\n");
    res.end();

})

app.post("/post2",function(req,res){

    res.write("post2\n");
    res.end();

})

app.listen(8888)