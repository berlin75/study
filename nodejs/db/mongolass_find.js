'use strict';

const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect('mongodb://localhost:27017/study');
// const mongolass = new Mongolass('mongodb://localhost:27017/test');

const User = mongolass.model('User');
console.log(User);

User
  .find()
  .select({ name: 1, age: 1 })
  .sort({ name: -1 })
  .exec()
  .then(console.log)
  .catch(console.error);