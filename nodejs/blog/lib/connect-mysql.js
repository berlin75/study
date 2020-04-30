const config   = require('config-lite')(__dirname)
var mysql      = require('mysql');
var connection = mysql.createConnection(config.mysql);
connection.connect();

module.exports = connection;


// var sql = `CREATE TABLE IF NOT EXISTS user (
//   id int(10) unsigned NOT NULL AUTO_INCREMENT,
//   name char(20) NOT NULL DEFAULT '',
//   password varchar(50) NOT NULL DEFAULT '',
//   avatar varchar(100) NOT NULL DEFAULT '',
//   gender enum('男','女','保密') NOT NULL DEFAULT '保密',
//   bio varchar(255) NOT NULL DEFAULT '',
//   PRIMARY KEY (id),
//   UNIQUE KEY name (name)
// ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;`

// connection.query(sql,function (err, result) {
//   if(err) console.log('[ERROR] - ',err.message);
// });

//只存储用户的名称、密码（加密后的）、头像、性别和个人简介这几个字段
// exports.User = mongolass.model('User', {
//   name: { type: 'string' },
//   password: { type: 'string' },
//   avatar: { type: 'string' },
//   gender: { type: 'string', enum: ['m', 'f', 'x'] },
//   bio: { type: 'string' }
// })

// sql = `CREATE TABLE IF NOT EXISTS post (
//   id int(10) unsigned NOT NULL AUTO_INCREMENT,
//   author char(20) NOT NULL DEFAULT '',
//   title varchar(50) NOT NULL DEFAULT '',
//   content text,
//   pv INT (10) unsigned NOT NULL DEFAULT '0',
//   create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   PRIMARY KEY (id)
// ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;`

// 只存储文章的作者 id、标题、正文和点击量这几个字段
// exports.Post = mongolass.model('Post', {
//   author: { type: Mongolass.Types.ObjectId },
//   title: { type: 'string' },
//   content: { type: 'string' },
//   pv: { type: 'number' }
// })
// exports.Post.index({ author: 1, _id: -1 }).exec()// 按创建时间降序查看用户的文章列表

// 只需要留言的作者 id、留言内容和关联的文章 id 这几个字段
// var sql = `CREATE TABLE IF NOT EXISTS comment (
//   id int(10) unsigned NOT NULL AUTO_INCREMENT,
//   author char(20) NOT NULL DEFAULT '',
//   content varchar(250) NOT NULL DEFAULT '',
//   postId char(20) NOT NULL DEFAULT '',
//   create_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   update_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   PRIMARY KEY (id)
// ) ENGINE=InnoDB  DEFAULT CHARSET=utf8;`


// exports.Comment = mongolass.model('Comment', {
//   author: { type: Mongolass.Types.ObjectId },
//   content: { type: 'string' },
//   postId: { type: Mongolass.Types.ObjectId }
// })
// exports.Comment.index({ postId: 1, _id: 1 }).exec()// 通过文章 id 获取该文章下所有留言，按留言创建时间升序
