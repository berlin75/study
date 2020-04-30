const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/study' , {useMongoClient: true})

var schema = new Schema({ name: String });
schema.path('name').get(function (v) {
  return v + ' is my name';
});
schema.set('toObject', { getters: true });
var M = mongoose.model('Person', schema);
var m = new M({ name: 'Max Headroom' });
console.log(m); 
// { name: 'Max Headroom is my name', _id: 5a2df3a77f1d9466ac439619, id: '5a2df3a77f1d9466ac439619' }
m.age = 22;
console.log(m);
// { name: 'Max Headroom is my name', _id: 5a2df3a77f1d9466ac439619, id: '5a2df3a77f1d9466ac439619' }
console.log(m.toObject()); 
// { name: 'Max Headroom is my name', _id: 5a2df3a77f1d9466ac439619, id: '5a2df3a77f1d9466ac439619' }


var schema = new Schema({ name: String });
schema.path('name').get(function (v) {
  return v + ' is my name';
});
schema.set('toJSON', { getters: true, virtuals: false });
var M = mongoose.model('Person', schema);
var m = new M({ name: 'Max Headroom' });
console.log(1, m.toObject()); 
// 1 { name: 'Max Headroom', _id: 5a2df3f58bf7165ea4d40f52 }
console.log(2, m.toJSON());   
// 2 { name: 'Max Headroom is my name',_id: 5a2df3f58bf7165ea4d40f52 }

// since we know toJSON is called whenever a js object is stringified:
console.log(3, JSON.stringify(m)); 
// {3 '{"name":"Max Headroom is my name","_id":"5a2df3f58bf7165ea4d40f52"}'