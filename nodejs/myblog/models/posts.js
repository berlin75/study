const Post = require('../lib/mongo').Post;
const CommentModel = require('./comments');
const marked = require('marked');

Post.plugin('contentToHtml', {
	afterFind: function afterFind(posts){
		return posts.map(post => {
			post.content = marked(post.content);
			return post;
		})
	},
	afterFindOne: function afterFindOne(post){
		if(post) post.content = marked(post.content);
		return post;
	}
})

Post.plugin('addCommentsCount', {
	afterFind: function(posts){
		return Promise.all(posts.map(post => {
			return CommentModel.getCommentsCount(post._id).then(commentsCount => {
				post.commentsCount = commentsCount;
				return post;
			})
		}))
	},
	afterFindOne: function(post){
		if(post){
			return CommentModel.getCommentsCount(post._id).then(commentsCount => {
				post.commentsCount = commentsCount;
				return post;
			})
		}
		return post;
	}
})

module.exports = {
	create: function create(post){
		return Post.create(post).exec();
	},

	getPostById: function getPostById(postId){
		return Post.findOne({_id: postId})
			.populate({path: 'author', model: 'User'})
			.addCreateAt()
			.addCommentsCount()
			.contentToHtml()
			.exec()
	},

	getPosts: function getPosts(author){
		const query = {};
		if(author) query.author = author; 
		return Post.find(query)
			.populate({path: 'author', model: 'User'})
		    .sort({ _id: -1 })
		    .addCreateAt()
		    .addCommentsCount()
		    .contentToHtml()
		    .exec()
	},

	incPv: function incPv(postId){
		return Post.update({_id: postId}, {$inc: {pv: 1}}).exec()
	},

	getRawPostById: function getRawPostById(postId){
		return Post.findOne({_id: postId})
			.populate({path: 'author', model: 'User'})
			.exec()
	},

	updatePostById: function updatePostById(postId, data){
		return Post.update({_id: postId}, {$set: data}).exec();
	},

	delPostById: function delPostById(postId){
		return Post.remove({_id: postId}).exec()
			.then(r => {
				if(r.result.ok && r.result.n > 0) 
				return CommentModel.delCommentsByPostId(postId);
			})

	}
}