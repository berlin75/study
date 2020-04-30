var crypto = require("crypto");          // 导入加密解密库
var md5hash = crypto.createHash("md5");  // 创建一个md5生成工具对象
var str = "admin";                       // 测试用的字符串
md5hash.update(str);                     // 把字符串md5生成器,可多次调用
var hexstr = md5hash.digest("hex");      // 生成最终的md5值
console.log(hexstr);                     

// 第二次生成同样的字符串
md5hash = crypto.createHash("md5");      // 创建一个md5生成工具对象;若已调用过digest,必须重新生成md5hash
md5hash.update(str);                     // 把字符串md5生成器,可多次调用
hexstr = md5hash.digest("hex");          // 第二次生成最终的md5值
console.log(hexstr);                     

// 第三次生成
md5hash = crypto.createHash("md5");
md5hash.update(str);                     // 把字符串md5生成器,可多次调用
md5hash.update("leo");
hexstr = md5hash.digest("hex");          // 第三次生成最终的md5值
console.log(hexstr);    

var crypto = require("crypto");
var sha = crypto.createHmac("sha","nodejs");
sha.update("admin")
console.log(sha.digest("hex"))  
var sha = crypto.createHmac("sha","js");
sha.update("admin")
console.log(sha.digest("hex")) 

var crypto = require("crypto");
var sha = crypto.createHash("sha");
sha.update("my name is ")
sha.update("利奥")
console.log(sha.digest("hex"))

var crypto = require("crypto");
var sha = crypto.createHash("sha");
sha.update("my name is 利奥")
console.log(sha.digest("hex"))

console.log(crypto.getHashes());               