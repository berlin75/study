const co = require('co');
const moment = require('moment');
const Mongolass = require('mongolass');
const mongolass = new Mongolass('mongodb://localhost:27017/study');
const User = mongolass.model('User');

mongolass.plugin('addCreatedAt', {
  beforeInsert: function (format) {
    console.log('beforeInsert', this._op, this._args, format);
    // beforeInsert insert [ { firstname: 'san', lastname: 'zhang' } ] YYYY-MM-DD
    this._args[0].createdAt = moment().format(format);
  }
});

User.plugin('addFullname', {
  afterFindOne: function* (user, opt) {
    console.log('afterFindOne', this._op, this._args, opt);
    // afterFindOne findOne [] { sep: '-' }
    if (!user) return user;
    user.fullname = user.firstname + opt.sep + user.lastname;
    return user;
  },
  afterFind: async function (users, opt) {
    console.log('afterFind', this._op, this._args, opt);
    // afterFind find [ { firstname: 'san' } ] { sep: ' ' }
    if (!users.length) return users;
    return users.map(user => {
      user.fullname = user.firstname + opt.sep + user.lastname;
      return user;
    });
  }
});

co(function* () {
  // when use yield, .exec() is omissible.
  yield User.insert({ firstname: 'san', lastname: 'zhang' }).addCreatedAt('YYYY-MM-DD');
  console.log(yield User.findOne().addFullname({ sep: '-' }));
  // { _id: 5850186544c3b82d23a82e45,
  //   firstname: 'san',
  //   lastname: 'zhang',
  //   createdAt: '2016-12-13',
  //   fullname: 'san-zhang' }
  console.log(yield User.find({ firstname: 'san' }).addFullname({ sep: ' ' }));
  // [ { _id: 5850186544c3b82d23a82e45,
  //     firstname: 'san',
  //     lastname: 'zhang',
  //     createdAt: '2016-12-13',
  //     fullname: 'san zhang' } ]
}).catch(console.error.bind(console));