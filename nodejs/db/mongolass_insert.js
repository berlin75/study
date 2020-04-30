'use strict';
 
const Mongolass = require('mongolass');
const Schema = Mongolass.Schema;
const mongolass = new Mongolass('mongodb://localhost:27017/study');

const UserSchema = new Schema('UserSchema', {
  name: { type: 'string' },
  age: { type: 'number' }
});
const User = mongolass.model('User', UserSchema);
 
/*
equal to:
const User = mongolass.model('User', {
  name: { type: 'string' },
  age: { type: 'number' }
});
will create inner schema named `UserSchema`.
*/
 
User
  .insertOne({ name: 'xiaoxiao', age: 27 })
  .exec()
  .then(console.log)
  .catch(console.error);