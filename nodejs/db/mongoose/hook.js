const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/study' , {useMongoClient: true})

var UserSchema = new Schema({          
    username : { type: String, index: true},        //用户账号,建立索引
    userpwd: {type: String},                        //密码
    userage: {type: Number},                        //年龄
    logindate : { type: Date, default: Date.now}    //最近登录时间,默认值
});

UserSchema.pre('findOne', function() {
  console.log(this instanceof mongoose.Query); // true
  this.start = Date.now();
});

UserSchema.post('findOne', function(doc) {
  console.log(this instanceof mongoose.Query); // true
  // prints returned documents
  console.log('findOne() returned ' + JSON.stringify(doc));
  // prints number of milliseconds the query took
  console.log('findOne() took ' + (Date.now() - this.start) + ' millis');
});

// UserSchema.pre('findOne',function(next){
//     console.log('pre方法1');
//     next();
//     console.log('pre方法1next');
// }); 

// UserSchema.pre('findOne',function(next){
//     console.log('pre方法2');
//     next();
// });

// UserSchema.pre('findOne', true, function(next, done){
//     console.log('pre方法true');
//     next();
//     setTimeout(done, 10000);
// });

// UserSchema.pre('findOne',function(next){
//     console.log('pre方法3');
//     next();
// });

// UserSchema.post('findOne',function(doc){
//     console.log('post方法1',doc.name);
// }); 

// UserSchema.post('findOne',function(doc){
//     console.log('post方法2');
// }); 

// UserSchema.post('findOne',function(doc, next){
//     setTimeout(function() {
// 	    console.log('post1');
// 	    next();   
// 	}, 10);
// }); 

// UserSchema.post('findOne',function(doc, next){
//     console.log('post2');
//     next();
// }); 

const User = mongoose.model('User', UserSchema);

User.findOne((err, doc) => {
	if(err) throw err;
	console.log('find', doc.toObject().name)
})