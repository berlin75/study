/*
目标：将桌面的jpg图片移动到指定文件进行整理,并写入数据库
https://www.cnblogs.com/zqzjs/p/5491349.html
*/

var schedule = require('node-schedule');
var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
const desktopPath = 'C:/Users/lenovo/Desktop/';
const targetPath = 'E:/wamp64/www/study/nodejs/timer/screenShot/';

timePoll();
// 轮询桌面
function timePoll(){
    console.log('--------[开始轮询]----------')
    schedule.scheduleJob('30 * * * * *', function(){
      console.log(`\n【${(new Date).toLocaleTimeString()}】- 每分钟的30s都会执行轮询`);
      console.time('scan-timer');
      scanDesk().then(() => console.log('done')).catch(err => console.log(err));
      console.timeEnd('scan-timer');
    }); 
}

// 扫描桌面
async function scanDesk(){
    console.log('--------开始访问桌面----------');
    var files = fs.readdirSync(desktopPath);
    var targetArr = [];
    files.forEach( function (file){ 
      if(path.extname(file) === '.jpg') targetArr.push(file);
    });
    if(!targetArr.length) return console.log('桌面无资源!');
    console.log(`扫描到${targetArr.length}张图片`);

    var lastPath = createLastFloder();
    var connection = await connectMysql();
    
    const promiseArr = targetArr.map(filename => {
    	saveImageToFile(connection, filename, lastPath);
    })
    await Promise.all(promiseArr).catch(err => console.log(err));

    // await closeMysql(connection).catch(err => console.log(err));
}

function createLastFloder(){
    var lastPath = targetPath + (new Date).getFullYear() + '_' + ((new Date).getMonth()+1) + '_' + (new Date).getDate() + '/';
    if(!fs.existsSync(lastPath)){
      fs.mkdirSync(lastPath);
      console.log('[文件夹创建]-' +lastPath + "成功!");
    }
    return lastPath;
}

function saveImageToFile(connection, file, lastPath){
  return new Promise((resolve, reject) => {
    var fileReadStream = fs.createReadStream(desktopPath + file);
    var fileWriteStream = fs.createWriteStream(lastPath + file);
    fileReadStream.pipe(fileWriteStream);
    fileWriteStream.on('close',function(err){
      if(err) return reject(err.message);
      console.log(`${file}复制成功`);

      var querySql = 'INSERT INTO scanDesk(Id,picname,picurl) VALUES (0,?,?)';   
      var querySql_Params = [file, lastPath + file];
      connection.query( querySql, querySql_Params, function (err, result){
        if(err) return reject(`[mysql insert error] - ${err.message}`);
        console.log(`${file}插入数据库成功!`); 

        fs.unlink(desktopPath + file, function(err){
          if(err) return reject(err.message); 
          console.log(`${file}删除成功\n`);
          resolve();
        })
      })
    })
  })   
}

function connectMysql(){
	return new Promise((resolve, reject) => {
		var connection = mysql.createConnection({
	      host     : 'localhost',
	      user     : 'root',
	      password : '',
	      database : 'nodejs'
	    });
	    connection.connect(function(err){
	        if(err) return reject(err);
	        console.log('数据库连接成功!\n');
	    });
	    resolve(connection);
	})
}

function closeMysql(connection){ 
	return new Promise((resolve, reject) => {   
	    connection.end(function(err){
	        if(err) return reject(err.message);
	        console.log('关闭数据库连接成功!');
	        resolve();
	    });
	})
}

/*
drop table scanDesk;
CREATE TABLE IF NOT EXISTS `scanDesk` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `picname` char(50) NOT NULL DEFAULT '',
  `picurl` char(100) NOT NULL DEFAULT '',
  `operatetime`  datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

*/