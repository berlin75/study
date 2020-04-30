const fs = require('fs');
fs.rename('./stat.js', 'stats.js', (err) => {
	if(err) throw err;
	console.log('rename complete');
	fs.stat('./stats.js',(err, stats) => {
		if(err) throw err;
		console.log(stats);
	})
})
