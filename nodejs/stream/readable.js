var Readable = require('stream').Readable;
var rs = new Readable;
// rs.push('node');
// rs.push('.js');
// rs.push('\n is great \n')
// rs.push(null);

// rs.pipe(process.stdout);

// var c = 97;
// rs._read = function () {
//     if (c > 'z'.charCodeAt(0)){
//         rs.push("\n");
//         rs.push(null);
//     }else{
//         setTimeout(function(){
//             rs.push(String.fromCharCode(c++));
//         },500)
//     }
// };

// rs.pipe(process.stdout);


var Readable = require('stream').Readable;
var rs = new Readable({objectMode:true})
var c = 97;
rs._read = function () {
    if (c > 'z'.charCodeAt(0)){
        rs.push("\n");
        rs.push(null);
        return;
    }
    setTimeout(function () {
        rs.push(String.fromCharCode(c++));
    }, 100)

};

rs.on("readable",function(){
    console.log(rs.read(3));
})
var datas = '';
rs.on('data', function(data){
	datas += data
})
rs.on('end', function(){
	console.log(datas);
})
