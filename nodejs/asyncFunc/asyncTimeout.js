// function timeout(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// async function timeout(ms){
// 	await new Promise(resolve => setTimeout(resolve, ms))
// }

// async function asyncPrint(value, ms) {
//   await timeout(ms);
//   console.log(value);
// }

// asyncPrint('hello world', 5000);

async function f() {
  try {
    await Promise.reject('出错了');
  }catch(err){
  	console.log(err)
  };
  return await Promise.resolve('hello world');
}
f().then(v => console.log(v))