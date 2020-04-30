var mongoose = require('mongoose')
  , Schema = mongoose.Schema
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/population' , {useMongoClient: true})

  
var personSchema = Schema({
  _id     : Number,
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  _creator : { type: Number, ref: 'Person' },
  title    : String,
  fans     : [{ type: Number, ref: 'Person' }]
});

var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);
var aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });
var story1 = new Story({
	title: "Once upon a timex.",
	_creator: aaron._id    // assign the _id from the person
});

aaron.stories.push(story1);
aaron.save((err, doc) => {
	if(err) return console.log('err', err);
	story1.save(function (err) {
	    if (err) return console.log('err', err);
	    console.log('saved');
	});
});
  
/* 根据文章标题查找作者信息 */
Story
.findOne({ title: 'Once upon a timex.' })
.populate('_creator')
.exec(function (err, story) {
  if (err) return handleError(err);
  console.log(1, story, story._creator.name); // 'Aaron'
});
/*
{ 
  _id: 5a2f6ef878a35170fc414c55,
  title: 'Once upon a timex.',
  _creator: { _id: 0, name: 'Aaron', age: 100, __v: 0, stories: [ 5a2f6ef878a35170fc414c55 ] },
  __v: 0,
  fans: [] 
}
*/

/* 填充多个path feild选择 */
Story
.findOne({ title: 'Once upon a timex.' })
.populate('_creator fans', 'name -_id')
.exec(function (err, story) {
  if (err) return handleError(err);
  console.log(2, story, story._creator.name); // 'Aaron'
});
/*
{ _id: 5a2f6ef878a35170fc414c55, title: 'Once upon a timex.', _creator: { name: 'Aaron' }, __v: 0, fans: [] }
*/

/* 根据作者名字查找全部作品标题 */
Person
.findOne({name: 'Aaron'})
.populate('stories', 'title -_id')
.exec((err, person) => {
	console.log(3, person, person.stories);
})
/*
{ _id: 0, name: 'Aaron', age: 100, __v: 0, stories: [ { title: 'Once upon a timex.' } ] }
*/

Story.find({_creator: aaron._id}).exec((err, stories) => {
	console.log(4, stories);
})
/*
[ {_id: 5a2f6ef878a35170fc414c55, title: 'Once upon a timex.', _creator: 0, __v: 0, fans: [] } ]
*/