var arr = [5, 10, 45, 123, 56, 67, 3];

function add(num){
	var sum = 0;
	for(var i = 0; i <= num; i++) sum += i;
	return sum;
}

function* gen(){
	for(var i = 0; i < arr.length; i++) yield add(arr[i])
}

var g = gen();
var res = g.next();
while(!res.done){
	console.log(res);
	res = g.next();
}

