var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/test';

var insertData = function(db,callback){
  var collection = db.collection('user');
  var data = [{"name": "heiying6958", "age": 29, "email": "11111212@qq.com"},{"name": "xiaoxiao", 'age':20}]
  collection.insert(data, function(err, result){
    if(err){
      console.log(err);
      return;
    }
    callback(result);
  });
}

MongoClient.connect(DB_CONN_STR, function(err, db){
  if(err){
    console.log(err);
    return;
  }
  insertData(db, function(result){
    console.log(result);
    db.close();
  })
})

/*
{ result: { ok: 1, n: 2 },
  ops:
   [ { name: 'heiying6958',
       age: 29,
       email: '11111212@qq.com',
       _id: 5a23f3cf89b84a2150e36973 },
     { name: 'xiaoxiao', age: 20, _id: 5a23f3cf89b84a2150e36974 } ],
  insertedCount: 2,
  insertedIds: [ 5a23f3cf89b84a2150e36973, 5a23f3cf89b84a2150e36974 ] }
*/

var updateData = function(db,callback){
  var collection = db.collection('user');
  var wherestr = {"name": "xiaoxiao"};
  var newstr = {$set:{"age": 22}};
  collection.update(wherestr, newstr, function(err, result){
    if(err){
      console.log(err);
      return;
    }
    callback(result);
  });
}

MongoClient.connect(DB_CONN_STR, function(err, db){
  if(err){
    console.log(err);
    return;
  }
  updateData(db, function(result){
    console.log(result);
    db.close();
  })
})

var deleteData = function(db,callback){
  var collection = db.collection('user');
  var wherestr = {"name": "unkown"};
  collection.remove(wherestr, function(err, result){
    if(err){
      console.log(err);
      return;
    }
    callback(result);
  });
}

MongoClient.connect(DB_CONN_STR, function(err, db){
  if(err){
    console.log(err);
    return;
  }
  deleteData(db, function(result){
    console.log(result);
    db.close();
  })
})

var findData = function(db,callback){
  var collection = db.collection('user');
  var wherestr = {"age": {$gt: 25}};
  collection.find(wherestr, function(err, result){
    if(err){
      console.log(err);
      return;
    }
    callback(result);
  });
}

MongoClient.connect(DB_CONN_STR, function(err, db){
  if(err){
    console.log(err);
    return;
  }
  findData(db, function(result){
    console.dir(result);
    db.close();
  })
})

/****************************方法二*********************************/ 

var updateData = function(db, callback) {
  var collection = db.collection('user');
  collection.updateOne({ name : "xiaoxiao" }, { $set: { age : 21 } }, function(err, result) {
    if(err) return console.error(err)
    console.log(result.result.n);
    callback(result);
  });  
}

var insertData = function(db, callback) {
  var collection = db.collection('user');
  collection.insertMany([ {a : 1}, {a : 2}, {a : 3} ], function(err, result) {
    if(err) return console.error(err)
    console.log(result.result.n);
    console.log(result.ops.length);
    callback(result);
  });
}

var deleteData = function(db, callback) {
  var collection = db.collection('user');
  collection.deleteOne({ name : "unkown" }, function(err, result) {
    if(err) return console.error(err)
    console.log(result.result.n);
    callback(result);
  });
}

var findData = function(db, callback) {
  var collection = db.collection('user');
  collection.find({}).toArray(function(err, result) {
    if(err) return console.error(err)
    console.log(result.length);
    console.dir(result);
    callback(result);
  });
}

var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
  if(err) return console.error(err)
  // updateData(db, function(){ db.close(); });
  insertData(db, function(){ db.close(); });
  // deleteData(db, function(){ db.close(); });
  findData(db, function(){ db.close(); });
});