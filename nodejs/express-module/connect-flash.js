var express = require('express');
var session = require('express-session');
var flash = require('connect-flash');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session({
  name: 'sid',
  secret: 'sid',
  saveUninitialized: false,
  resave: true,
  cookie: { maxAge: 60000 }
}))
app.use(flash());
app.use(/\/[\w|-]+/ ,(req, res, next) => {
  req.session.user = req.originalUrl;
  next();
})

app.get('/', function(req, res){
  console.log(req.session);
  res.render('connect-flash', { message: req.flash('info') });
  console.log(req.session.flash)
});

app.get('/flash', function(req, res){
  req.flash('info', 'Hi there!')
  res.redirect('/');
});

app.get('/no-flash', function(req, res){
  res.redirect('/');
});

app.get('/multiple-flash', function(req, res){
  req.flash('info', ['Welcome', 'Please Enjoy']);
  res.redirect('/');
});
app.listen(8888);