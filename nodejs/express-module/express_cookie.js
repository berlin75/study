// express_cookie.js
var express      = require('express')
var cookieParser = require('cookie-parser')
 
var app = express()
app.use(cookieParser())
 
app.get('/', function(req, res) {
  console.log("Cookies: ", req.cookies)
  for(var prop in req.cookies){
  	res.write(`${prop}: ${req.cookies[prop]}:`)
  }
  res.end();
})
 
app.listen(8888)