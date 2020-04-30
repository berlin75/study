var {App, static, post} = require("../..");  // 默认执行的模块
var app = new App;

app.use(static(__dirname+"/public"));
app.use(post);

// 定义路由规则和处理函数
app.post("/post",function(req,res){

    res.write("post success!\n");
    res.write("----------------\n")
    res.write("title: \n")
    res.write(req.body.title+"\n");
    res.write("content: \n");
    res.write(req.body.content);

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