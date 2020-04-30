const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/check').checkLogin;
const commentModel = require('../models/comments');

// POST /comments
router.post('/', checkLogin, (req, res, next) => {
	const author = req.session.user._id;
	const postId = req.fields.postId;
	const content = req.fields.content;
	try{
		if(!content.length) throw new Error('请填写评论内容')
	}catch(e){
		req.flash('error', e.message);
		res.redirect('back');
	}
	commentModel.create({author: author, postId: postId, content: content})
		.then(() => {
			req.flash('success', '评论成功');
			res.redirect('back');
		})
		.catch(next)
})

// GET /comments/:commentId/remove
router.get('/:commentId/remove', checkLogin, (req, res, next) => {
	const commentId = req.params.commentId;
	commentModel.getCommentById(commentId)
		.then(comment => {
			if(!comment) throw new Error('留言不存在');
			if(comment.author != req.session.user._id) throw new Error('权限不足');
			commentModel.delCommentById(commentId)
				.then(() => {
					req.flash('success', '删除留言成功');
					res.redirect('back');
				})
				.catch(next)
		})
		.catch(next)
})

module.exports = router;