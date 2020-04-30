// user.js定义一个user的Schema,用户信息
var mongoose = require('./db.js');
var Schema = mongoose.Schema;

var UserSchema = new Schema({          
    username : { type: String, index: true},        //用户账号,建立索引
    userpwd: {type: String},                        //密码
    userage: {type: Number},                        //年龄
    logindate : { type: Date, default: Date.now}    //最近登录时间,默认值
});

module.exports = mongoose.model('User',UserSchema);