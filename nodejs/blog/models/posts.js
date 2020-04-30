const connection = require('../lib/connect-mysql')

module.exports = {
  // 创建一篇文章
  create: function create (post) { 
    // return User.create(user).exec()
    return new Promise((resolve, reject) => {
    	var  addSql = 'insert into post(id,author,title,content,pv) values(0,?,?,?,?)';
		var  addSqlParams = [post.author, post.title, post.content, post.pv];
		connection.query(addSql, addSqlParams, function (err, result) {
		  	if(err){
		  		reject(err);
		  	}else{
		  	 	resolve(result); 
		  	}      
		});
    })
  },

  // 通过文章 id 获取一篇文章,文章内容，作者信息，该文章的全部评论
  getPostById: function getPostById (postId) {
	return new Promise((resolve, reject) => {
		var sql = 'select * from post where id = ? limit 1'
		connection.query(sql, postId, function (err, posts) {
		  	if(err){
		  		reject(err);
		  	}else {
		  		var post = posts[0];
		  		var sql = 'select * from user where id = ? limit 1'
	  			connection.query(sql, post.author, function (err, users) {
				  	if(err){
				  		reject(err);
				  	}else {
				  		post['author'] = users[0];
				  		resolve(post);
				  	}
				})
		  	}
		})
	})
  },

  // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
  // posts = [{id: 1, title: '', content: '', author: {name: '', gender: ''}},
  //          {id: 1, title: '', content: '', author: {name: '', gender: ''}}]
  getPosts: function getPosts (author) {
  	function getUserById(id){
		return new Promise((resolve, reject) => {
			var sql = 'select * from user where id = ? limit 1';
  			connection.query(sql, id, function (err, user) {
			  	if(err){
			  		reject(err);
			  	}else {
			  		resolve(user[0]);
			  	}
			})
		})
	}
		  			
	async function getAuthorInfor(posts) {
	  	let promises = posts.map((post) => getUserById(post.author));
	  	let userArr = await Promise.all(promises); 
	  	posts.forEach((post, index) => {
	  		post['author'] = userArr[index];
	  	})
	  	return Promise.resolve(posts);
	}
    if(author){
    	function getAllPosts(author){
    		return new Promise((resolve, reject) => {
	      		var sql = 'select * from post where post.author=? order by post.create_time desc';
	      		connection.query(sql, author, function (err, posts) {
				  	if(err){
				  		reject(err);
				  	}else {
				  		resolve(posts);
				  	}
				})
			})
    	}
  	}else{
  		function getAllPosts(author){
    		return new Promise((resolve, reject) => {
	      		var sql = 'select * from post order by post.create_time desc';
	      		connection.query(sql, function (err, posts) {
				  	if(err){
				  		reject(err);
				  	}else {
				  		resolve(posts);
				  	}
				})
			})
    	}
	
  	}
  	return getAllPosts(author)
		.then(posts => getAuthorInfor(posts))
		.catch(err => console.log(err))
  },

  // 通过文章 id 给 pv 加 1  update `info` set `comments` = `comments`+1 where `id` = 32 
  incPv: function incPv (postId) {
  	return new Promise((resolve, reject) => {
	    var sql = 'update post set pv = pv + 1 where Id = ?';
		connection.query(sql, postId, function (err, result) {
	  		if(err){
		  		reject(err);
		  	}else {
		  		resolve(result); 
		  	}
		});
	})
  },

  	// 通过文章 id 获取一篇原生文章（编辑文章）
	getRawPostById: function getRawPostById (postId) {
	  return new Promise((resolve, reject) => {
	    var sql = 'select post.id, post.author, post.title, post.content, post.pv, post.create_time, post.update_time,user.name,user.avatar,user.gender,user.bio from post left join user on post.author=user.id and post.id=?  limit 1';
		connection.query(sql, postId, function (err, result) {
	  		if(err){
		  		reject(err);
		  	}else {
		  		resolve(result[0]); 
		  	}
		});
	  })
	},

	// 通过文章 id 更新一篇文章
	updatePostById: function updatePostById (postId, data) {
	  return new Promise((resolve, reject) => {
	    var sql = 'update post set title = ?, content = ? where Id = ?';
		connection.query(sql, [data.title, data.content, postId], function (err, result) {
	  		if(err){
		  		reject(err);
		  	}else {
		  		resolve(result); 
		  	}
		});
	  })
	},

	// 通过文章 id 删除一篇文章
	delPostById: function delPostById (postId) {
	  return new Promise((resolve, reject) => {
	    var sql = 'delete from post where id= ?';
		connection.query(sql, postId, function (err, result) {
	  		if(err){
		  		reject(err);
		  	}else {
		  		resolve(result); 
		  	}
		});
	  })
	}
}