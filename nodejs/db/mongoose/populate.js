const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const UserSchema = Schema({
	name: String,
	age: Number,
	following: [{type: Schema.Types.ObjectId, ref: "User"}]
});

const User = mongoose.model('User', UserSchema);

var lily = new User({name: 'lily', age: 22});
var lucy = new User({name: 'lucy'});

console.log('lily', lily);  // lily { name: 'lily', age: 22, _id: 5a2ce126357b36346097506b, following: [] }
console.log('lucy', lucy);  // llucy { name: 'lucy', _id: 5a2ce126357b36346097506c, following: [] }

mongoose.connect('mongodb://localhost/study' , {useMongoClient: true})
User.remove().exec();

lily.save(cb1);

function cb(err, doc){
	if(err) throw err;
	lucy.following.push(lily._id);   // lucy.following.push(doc._id);
	console.log(lucy);               // {name:'lucy',_id:5a2ce3480cb0825b48d60387,following:[5a2ce3480cb0825b48d60386 ] }
	lucy.save((err, doc)=>console.log(doc)); //{__v: 0,name:'lucy',_id:5a2ce3480cb0825b48d60387,following:[5a2ce3480cb0825b48d60386 ] }
}

function cb1(err, doc){
	if(err) throw err;
	console.log('lily1', lily); 
	lucy.following.push(lily);  // lucy.following.push(doc);
	console.log('lucy1', lucy); 
	lucy.save().then(doc => {
		console.log(doc);       // 同lucy1
		User.find({name: 'lucy'}).exec().then(r => console.log('r', r))
		User.findOne({name: 'lucy'}).populate('following').exec().then(r => console.log('r1', r))
	})
}

// lily1 { __v: 0,name: 'lily',age: 22,_id: 5a2ce126357b36346097506b,following: [] }
// lucy1 {name:'lucy',_id:5a2ce126357b36346097506c,following:[{_id:5a2ce126357b36346097506b,age: 22,name: 'lily',__v: 0,following: [] } ] }
// r [ { _id: 5a2ce126357b36346097506c,name: 'lucy',__v: 0,following: [ 5a2ce126357b36346097506b ] } ]
// r1 { _id: 5a2ce126357b36346097506c,name: 'lucy',__v: 0,following:[ { _id: 5a2ce126357b36346097506b,name: 'lily',age: 22,__v: 0,following: [] } ] }