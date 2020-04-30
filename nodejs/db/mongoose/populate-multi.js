// Get friends of friends - populate the 'friends' array for every friend

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/population' , {useMongoClient: true})

var friendSchema = new Schema({
  name: String,
  friends: [{ type: Schema.Types.ObjectId, ref: 'Friend' }]
});

var Friend = mongoose.model('Friend', friendSchema)

var zhangsan = new Friend({name: 'zhangsan'});
var lisi = new Friend({name: 'lisi'});
var wangwu = new Friend({name: 'wangwu'});
var liuliu = new Friend({name: 'liuliu'});
zhangsan.friends.push(lisi._id, wangwu._id);
lisi.friends.push(wangwu._id, liuliu._id);
wangwu.friends.push(liuliu._id, zhangsan._id);

Friend.remove().exec();
Friend.insertMany([zhangsan, lisi, wangwu, liuliu], function(err,docs){
    console.log('docs', docs);

    Friend.
	  findOne({ name: 'lisi' }).
	  populate({
	    path: 'friends',
	    populate: { path: 'friends' }
	  })
	  .exec((err, doc) => console.log('doc', doc, doc.friends))
});  

/*
 [ { __v: 0,
    _id: 5a2f77f6b0f8967188b37f46,
    name: 'zhangsan',
    friends: [ 5a2f77f6b0f8967188b37f47, 5a2f77f6b0f8967188b37f48 ] },
  { __v: 0,
    _id: 5a2f77f6b0f8967188b37f47,
    name: 'lisi',
    friends: [ 5a2f77f6b0f8967188b37f48, 5a2f77f6b0f8967188b37f49 ] },
  { __v: 0,
    _id: 5a2f77f6b0f8967188b37f48,
    name: 'wangwu',
    friends: [ 5a2f77f6b0f8967188b37f49, 5a2f77f6b0f8967188b37f46 ] },
  { __v: 0,
    _id: 5a2f77f6b0f8967188b37f49,
    name: 'liuliu',
    friends: [] } 
]


{ _id: 5a2f7883baa82f71604ec89f,
  __v: 0,
  name: 'lisi',
  friends:
   [ { _id: 5a2f7883baa82f71604ec8a0,
       __v: 0,
       name: 'wangwu',
       friends: [Array] },
     { _id: 5a2f7883baa82f71604ec8a1,
       __v: 0,
       name: 'liuliu',
       friends: [] } 
   ] 
} 

[
	{"_id":"5a2f7883baa82f71604ec8a0","__v":0,"name":"wangwu","friends":[
		{"_id":"5a2f7883baa82f71604ec8a1","__v":0,"name":"liuliu","friends":[]},
		{"_id":"5a2f7883baa82f71604ec89e","__v":0,"name":"zhangsan","friends":["5a2f7883baa82f71604ec89f","5a2f7883baa82f71604ec8a0"]}]},
	{"_id":"5a2f7883baa82f71604ec8a1","__v":0,"name":"liuliu","friends":[]}
]
*/