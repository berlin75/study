// 只有在地址栏输入http://localhost:3000/user/1337的情况下，页面才会显示“参数通过检验”
 
var express = require('express');
var app = express();
app.param('id', function (req, res, next, id) {
  if(id==1337) next();
  else res.sendStatus(404);
});
app.get('/user/:id', (req, res) => res.send('参数通过检验'));
 
app.listen(3000, () => console.log('Ready'));