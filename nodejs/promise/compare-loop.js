<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>test</title>
</head>
<body>
<button id="btn1">for/of'</button>
<button id="btn2">for</button>
<button id="btn3">forEach</button>	
<button id="btn4">promiseAll</button>
<button id="btn5">promiseAll await</button>	
<button id="btn6">promiseAll await for/of</button>	

<script> 
var sleep = function (arg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(arg), 1000);
    })
};
var arr = [1, 2, 3, 4, 5];
var len = arr.length;

var start1 = async function(){
	var l1 = len;
    for(let i of arr){
    	console.log(await sleep(i));
    	l1--;
    	if(!l1) console.timeEnd('for/of');
    }
}

btn1.onclick = () => {
	console.time('for/of');
	start1();
}
// for/of: 5009.291ms

var start2 = async function(){
	var l2 = len;
    for(let i=0; i < len; i++){
    	console.log(await sleep(arr[i]));
    	l2--;
    	if(!l2) console.timeEnd('for');
    }
}
btn2.onclick = () => {
	console.time('for');
	start2();
}
// for: 5006.321ms

var start3 = function(){
	var l3 = len;
    arr.forEach(async item => {
    	console.log(await sleep(item));
    	l3--;
    	if(!l3) console.timeEnd('forEach');
    })
}
btn3.onclick = () => {
	console.time('forEach');
	start3();
}
// forEach: 1003.483ms

btn4.onclick = () => {
	console.time('promiseAll');
	Promise.all(arr.map(item => sleep(item)))
		.then((rels) => {
			rels.map(rel => console.log(rel))
			console.timeEnd('promiseAll')
		})
}
// promiseAll: 1002.923ms

btn5.onclick = async () => {
	console.time('promiseAll await');
	var rels = await Promise.all(arr.map(item => sleep(item)))
	rels.map(rel => console.log(rel))
	console.timeEnd('promiseAll await')
}
// promiseAll await: 1004.461ms

btn6.onclick = async () => {
	console.time('promiseAll await for/of');
	var promises = arr.map(item => sleep(item));
	for(var promise of promises){
		console.log(await promise);
	}
	console.timeEnd('promiseAll await for/of')
}
// promiseAll await for/of: 1002.795ms

</script>

</body>
</html>

