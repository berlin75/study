'use strict';

const Mongolass = require('mongolass');
const Schema = Mongolass.Schema;
const mongolass = new Mongolass('mongodb://localhost:27017/study');

const Post = mongolass.model('Post', {
  		author: { type: Mongolass.Types.ObjectId }
	}, { collName: 'post' });

Post.insertOne({ author: '111111111111111111111111' })
  .then(function () {
    return Post.find({ author: '111111111111111111111111' });
  })
  .then(console.log);