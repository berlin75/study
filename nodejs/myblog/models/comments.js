const Comment = require('../lib/mongo.js').Comment;
const marked = require('marked');

Comment.plugin('contentToHtml', {
	afterFind: function(comments){
		return comments.map(comment => {
			comment.content = marked(comment.content); 
			return comment;
		})
	}
})

module.exports = {
	create: function create(comment){
		return Comment.create(comment).exec();
	},

	getCommentById: function getCommentById(commentId){
		return Comment.findOne({_id: commentId}).exec();
	},

	delCommentById: function delCommentById(commentId){
		return Comment.remove({_id: commentId}).exec();
	},

	delCommentsByPostId: function delCommentsByPostId(postId){
		return Comment.remove({postId: postId}).exec();
	},

	getComments: function getComments(postId){
		return Comment.find({postId: postId})
			.populate({path: 'author', model: 'User'})
			.sort({_id: 1})
			.addCreateAt()
			.contentToHtml()
			.exec();
	},

	getCommentsCount: function getCommentsCount(postId){
		return Comment.count({postId: postId}).exec();
	}
}