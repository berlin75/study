exports.index = function(res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<mete charset="utf8">床前明月光');
	res.end();
}