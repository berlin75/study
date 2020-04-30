var {App, static} = require("../..");
var app = new App;

// 加载static中间件
app.use(static(__dirname + "/public"));

app.get("/about",function(req,res){
    res.write("my name is leo");
    res.end();
})

app.get("/contact",function(req,res){
    res.write("contact me use QQ 1405491181");
    res.end();
})

app.listen(8888);