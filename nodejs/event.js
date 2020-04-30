var events = require('events');
var eventEmitter = new events.EventEmitter();

var connectHandler = function cennected(){
	console.log('连接成功');

	eventEmitter.emit('data_received');
};

eventEmitter.on('connection', connectHandler);

eventEmitter.on('data_received', function(){
	console.log('数据接收成功');
});

eventEmitter.emit('connection');

// ------------------------------------------------------

eventEmitter.on('start', function(what){
	console.log(`${what} is start`);

	eventEmitter.emit('finish', 'nodejs');
});

eventEmitter.on('finish', function(what){
	console.log(`${what} is finish`);
});

var startE = eventEmitter.emit('start', 'nodejs');

console.log(startE);

var arr = [1,2,3,4,5,6,7,8,9];
var i = 0
while(i < arr.length){
	eventEmitter.on('isprint', function printit(i){
		console.log(arr[i]);
		i++;
		eventEmitter.emit('isprint', i);
	});
}

console.log('code end');