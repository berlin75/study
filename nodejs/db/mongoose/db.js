var mongoose = require('mongoose');
var DB_URL = 'mongodb://localhost:27017/study';
mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {useMongoClient:true});                                 //连接
mongoose.connection.on('connected', function () {         //连接成功
    console.log('Mongoose connection open to ' + DB_URL);  
});    
mongoose.connection.on('error',function (err) {           //连接异常
    console.log('Mongoose connection error: ' + err);  
});    
mongoose.connection.on('disconnected', function () {      //连接断开
    console.log('Mongoose connection disconnected');  
});  

module.exports = mongoose;