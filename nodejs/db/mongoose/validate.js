var mongoose = require('mongoose');
var DB_URL = 'mongodb://localhost:27017/study';
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, {useMongoClient:true});  // 防止连接warning
var Schema = mongoose.Schema;

var toySchema = new Schema({ color: String, name: String });
var Toy = mongoose.model('Toy', toySchema);

var validator = function (value) {
  return /blue|green|white|red|orange|periwinkle/i.test(value);
};
Toy.schema.path('color').validate(validator,'Color `{VALUE}` not valid', 'Invalid color');

var toy = new Toy({ color: 'grease'});
toy.save(function (err) {
  // err is our ValidationError object;err.errors.color is a ValidatorError object
  console.error(err.errors.color.message, 'Color `grease` not valid');
  console.error(err.errors.color.kind, 'Invalid color');
  console.error(err.errors.color.path, 'color');
  console.error(err.errors.color.value, 'grease');
  console.error(err.name, 'ValidationError');
}); 
