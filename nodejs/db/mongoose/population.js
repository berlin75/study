var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {type: String, unipue: true},
	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
})
var User = mongoose.model('User', UserSchema);

var PostSchema = new Schema({
	poster: {type: Schema.Types.ObjectId, ref: 'User'},
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
	title: String,
	content: String
})
var Post = mongoose.model('Post', PostSchema);

var CommentSchema = new Schema({
	post: {type: Schema.Types.ObjectId, ref: 'Post'},
	commenter: {type: Schema.Types.ObjectId, ref: 'User'} ,
	content: String
})
var Comment = mongoose.model('Comment', CommentSchema);

mongoose.connect('mongodb://localhost/population', err => {
	if(err) throw err;
	createData()
	queryPopulate()
	modelPopulate();
	docPopulate();
});

function docPopulate(){
	User.findOne({name: 'aikin'})
    .exec(function(err, doc) {
        var opts = [{
            path   : 'posts',
            select : 'title'
        }];
        doc.populate(opts, function(err, populatedDoc) {
            console.log(populatedDoc);
        });
    });
}

function modelPopulate(){
	Post.find({title: 'post-aikin'})
    .populate('poster comments')
    .exec(function(err, docs) {
        var opts = [{
            path   : 'comments.commenter',
            select : 'name',
            model  : 'User'
        }];
        Post.populate(docs, opts, function(err, populatedDocs) {
            console.log(populatedDocs[0]);  
        });
    });
}

function queryPopulate(){
	Post.findOne({title: 'post-aikin'})
	    .populate('poster comments', '-_id')
	    .exec()
	    .then(doc => console.log(doc))

	Post.findOne({title: 'post-aikin'})
	    .populate({path: 'poster comments', select: '-_id'})
	    .exec(function(err, doc) {
	        console.log(doc);
	    });

	//填充所有 users 的 posts
	User.find()
	    .populate('posts', 'title', null, {sort: {title: -1 }})
	    .exec(function(err, docs) {
	        console.log(docs[0]);
	    });

	//填充 user 'luajin'的 posts
	User.findOne({name: 'luajin'})
	    .populate({path: 'posts', select: {title: 1 }, options: {sort: {title: -1 }}})
	    .exec(function(err, doc) {
	        console.log(doc);  
	    });
}

function createData(){
	var userIds = [mongoose.Types.ObjectId(), mongoose.Types.ObjectId(), mongoose.Types.ObjectId()];
	var postIds = [mongoose.Types.ObjectId(), mongoose.Types.ObjectId(), mongoose.Types.ObjectId()]
	var commentIds = [mongoose.Types.ObjectId(), mongoose.Types.ObjectId(), mongoose.Types.ObjectId()]

	var users = [], posts = [], comments = [];

	users.push({ _id: userIds[0], name: 'aikin', posts: [postIds[0]]});
	users.push({ _id: userIds[1], name: 'luna', posts: [postIds[1]]});
	users.push({ _id: userIds[2], name: 'luajin', posts: [postIds[2]]});

	posts.push({ _id: postIds[0], poster: userIds[0], comments: [commentIds[0]], title: 'post-aikin'});
	posts.push({ _id: postIds[1], poster: userIds[1], comments: [commentIds[1]], title: 'post-luna'});
	posts.push({ _id: postIds[2], poster: userIds[2], comments: [commentIds[2]], title: 'post-luajin'});

	comments.push({_id: commentIds[0], post: postIds[0], commenter: userIds[0], content: 'comment-aikin'})
	comments.push({_id: commentIds[1], post: postIds[1], commenter: userIds[1], content: 'comment-aikin'})
	comments.push({_id: commentIds[2], post: postIds[2], commenter: userIds[2], content: 'comment-aikin'})

	User.remove({}).exec();
	Post.remove({}).exec();
	Comment.remove({}).exec();
	User.create(users, (err, docs) => {
		Post.create(posts, (err, docs) => {
			Comment.create(comments, (err, docs) => {
				console.log('数据插入成功');
			})
		})
	})
}