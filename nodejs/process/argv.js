// argv.js
process.argv.forEach((val, index, array) => console.log(index + ': ' + val))

// 运行 node argv.js one two=three four
/*
0: E:\软件E\node\node.exe
1: E:\wamp64\www\study\nodejs\process\argv.js
2: one
3: two=three
4: four
*/