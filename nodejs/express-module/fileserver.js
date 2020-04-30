var express = require('express');
var app = express();

app.get('*', function(req, res){
    res.sendFile(req.path, {root: __dirname+'/', dotfiles: 'deny'});
});

app.listen(8888);