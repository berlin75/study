var fk = require("../..")
   ,App = fk.App
   ,download = fk.download
   ,app = new App
   ,view = fk.view
   ,fs = require("fs");

   app.use(view(__dirname+"/views"));

   app.get("/",function(req,res){

       res.view("index.html",{title:"index page",name:"leo"});
   })

   app.get("/about",function(req,res){
       var info = [
          ["Name","Leo"],
          ["Tel","213442322"],
          ["Card","322232"]
       ]
       res.view('about.html',{title:"about me info",info:info});
   })

   app.listen(8888);