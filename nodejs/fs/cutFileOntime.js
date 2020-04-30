var fs = require('fs');
var schedule = require("node-schedule"); 
var filename = 'hhe.txt'
var filename = 'The.Expendables.3.2014.UNRATED.BluRay.720p.390影视.rmvb';
var oldname = 'C:/Users/lenovo/Desktop/' + filename;
var newname = 'G:/' + filename;
var date = new Date(2017, 10, 29, 2, 50, 0);
console.log('waiting...', date); 

schedule.scheduleJob(date, function(){  
  fs.createReadStream(oldname).pipe(fs.createWriteStream(newname));
  console.log('OK');
});  

