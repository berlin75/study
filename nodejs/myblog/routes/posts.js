const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/check').checkLogin;
const PostModel = require('../models/posts');
const CommentModel = require('../models/comments');

// GET /posts?author=XXX
router.get('/', (req, res, next) => {
	const author = req.query.author;
	PostModel.getPosts(author)
		.then(posts => res.render('posts', {posts: posts}))
		.catch(next)
});


// GET /posts/create
router.get('/create', checkLogin, (req, res, next) => {
	res.render('create');
});

// POST /posts/create
router.post('/create', checkLogin, (req, res, next) => {
	const title = req.fields.title;
	const content = req.fields.content;
	try{
		if(!title.length)        throw new Error('请填写标题');
		else if(!content.length) throw new Error('请填写内容');
	}catch(e){
		req.flash('error', e.message);
		res.redirect('back');
	}
	let post = {
		author: req.session.user._id,
		title: title,
		content: content,
		pv: 0
	}
	PostModel.create(post)
		.then(result => {
			post = result.ops[0];
			req.flash('success', '发表成功');
			res.redirect(`/posts/${post._id}`)
		})
		.catch(next)
})

// GET /posts/:postId
router.get('/:postId', (req, res, next) => {
	const postId = req.params.postId;
	Promise.all([
			PostModel.getPostById(postId),
			CommentModel.getComments(postId),
			PostModel.incPv(postId)
		])
		.then(result => { 
			if(!result[0]) throw new Error('该文章不存在')
			res.render('post', {post: result[0], comments: result[1]});
		})
		.catch(next)
})

// GET /posts/:postId/edit
router.get('/:postId/edit', checkLogin, (req, res, next) => {
	PostModel.getRawPostById(req.params.postId)
		.then(post => {
			if(!post) throw new Error('该文章不存在');
			if(req.session.user._id != post.author._id) throw new Error('权限不足');
			res.render('edit', {post: post})
		})
		.catch(next)
})

// POST /posts/:postId/edit 修改文章之前要检查文章是否存在，是否有权限
router.post('/:postId/edit', checkLogin, (req, res, next) => {
	const postId = req.params.postId;
	const title = req.fields.title;
	const content = req.fields.content;
	try{
		if(!title.length)        throw new Error('请填写标题');
		else if(!content.length) throw new Error('请填写内容');
	}catch(e){
		req.flash('error', e.message);
		res.redirect('back');
	}
	PostModel.getRawPostById(postId)
		.then(post => {
			if(!post) throw new Error('该文章不存在');
			if(req.session.user._id != post.author._id) throw new Error('权限不足');
			PostModel.updatePostById(postId, {title: title, content: content})
				.then(() => {
					req.flash('success', '修改文章成功');
					res.redirect(`/posts/${postId}`);
				})
				.catch(next)
		})
		.catch(next)
})

// GET /posts/:postId/remove 删除文章之前要检查文章是否存在，是否有权限
router.get('/:postId/remove', checkLogin, (req, res, next) => {
	const postId = req.params.postId;
	PostModel.getRawPostById(postId)
		.then(post => {
			if(!post) throw new Error('该文章不存在');
			if(req.session.user._id != post.author._id) throw new Error('权限不足');
			PostModel.delPostById(postId)
				.then(() => {
					req.flash('success', '删除文章成功');
					res.redirect(`/posts/`);
				})
				.catch(next)
		})

	
})

module.exports = router;