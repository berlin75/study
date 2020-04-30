var express = require('express');
var app = express();

var admin = express();
admin.get('/', (req, res) => {
	console.log('admin', admin.mountpath);     // [ '/adm*n', '/manager' ]
	res.end('admin homepage');
})

var secret = express();
secret.get('/', (req, res) => {
	console.log('secret', secret.mountpath);   // /secr*t
	res.end('admin secret');
})

admin.use('/secr*t', secret);
app.use(['/adm*n', '/manager'], admin);

app.listen(8888)