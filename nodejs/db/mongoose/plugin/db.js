var mongoose = require('mongoose');
var DB_URL = 'mongodb://localhost:27017/plugin';
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, {useMongoClient:true});  // 防止连接warning
module.exports = mongoose;