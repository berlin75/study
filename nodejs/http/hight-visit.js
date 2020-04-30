const http = require('http');
const fs = require('fs');
const path = require('path');
const targetUrl = 'http://localhost/study/seoimg/socket.jpg';
const file = path.join(__dirname, path.basename(targetUrl));

const times = 1000;

let returnTimes = 0;
let errorTimes = 0;

function request(i){
  return new Promise((resolve, reject) => {
    http.get(targetUrl, res => {
      if (res.statusCode !== 200) {
        console.log(`down ${targetUrl}: ${res.statusCode}`);
      } else {
        console.log(`down ${targetUrl}: ${res.statusCode}`);
        res.pipe(fs.createWriteStream(`${file}`)); // 响应码200才下载文件
      }
      let chunks = [];
      res.on('data', chunk => {
        // console.log(`res data, data-length: ${chunk.length}`);
        chunks.push(new Buffer(chunk));
      });
      res.on('end', () => {
      	returnTimes++;
        let fileBuf = Buffer.concat(chunks);
        console.log(`${i} <> ${returnTimes} res end！buffer`, fileBuf.toString().length);
      });
      res.on("close", () => console.log("client res close"))
      res.on('error', () => console.log('stream error 数据读取错误'));
    })

    .on('error', err => {
      if(!err) return;
      errorTimes++;
      console.log(`req error ${errorTimes}: ${err.code} - ${err.message}`)
      reject(err);
    })
    .on('finish', () => {
      console.log('stream finish');
      resolve();
    })
    .on("socket", socket => console.log(`======== req socket ============`))

    if(i == 100) console.log('done')
  })
}



// for(var i = 0; i < times; i ++){
// 	(function(i){
// 		request(i)
// 	})(i)
// }

let arr = [];
for(let i=1; i <= times; i++) arr.push(i);

/*************for/of***************/
// for(let i of arr) request(i)

async function forOfAwait(){
	for(let i of arr){
		console.log(`++++ ${i} ++++`);
		await request(i);
	}
}

forOfAwait()

/*************forEach******************/
// arr.forEach(i => request(i))

async function forEachAwait(){
	arr.forEach(async i => await request(i))
}

// forEachAwait()

function request1(i){
	return new Promise((resolve, reject) => {
		http.get('http://localhost/study/', res => {
		    resultdata = '';
		    res.on('data', chunk => resultdata += chunk);
		    res.on('end',() => {
		        returnTimes++;
		        console.log(`${i} return ${resultdata.length}, returnTimes: ${returnTimes}`)
		    });
		}).on('error', err => {
			errorTimes++;
			console.log(`${err.message} errorTimes: ${errorTimes}`)
		});
		if(i == 100) console.log('done')
	})
}

function inOrder() {
    const promises = arr.map(i => request(i));
    promises.reduce((chain, promise) => {   
        return chain.then(() => promise);
    }, Promise.resolve());
}

// inOrder()

/****** 递归 *********/
async function digui(i){
	await requestRedce(i);
	i++;
	if(i <= arr.length) digui(i)
}

// digui(1)

