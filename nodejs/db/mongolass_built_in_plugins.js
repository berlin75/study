const co = require('co');
const Mongolass = require('mongolass');
const mongolass = new Mongolass('mongodb://localhost:27017/test');
const User = mongolass.model('User');

co(function* () {
  yield User.insert({ name: '1' });
  yield User.insert({ name: '2' });
  const result = yield User
    .find()
    .skip(1)
    .limit(1);
  console.log(result);
  // [ { _id: 58501c1281ea915a2760a2ee, name: '2' } ]
}).catch(console.error.bind(console));