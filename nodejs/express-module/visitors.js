var express = require('express');
var app = express();

var counter = 0;

// view engine setup
app.set('views', './views');
app.set('view engine', 'jade');

app.locals.title = "Welcome to Visitor";  
app.locals.counter = "0"; 

app.get('/*', function(req, res) {
  counter++;
  app.locals.counter = counter;
  res.render('index', {ip: req.ip});
});

app.listen(8888);
