/*我们让留言也支持了 markdown。删除一篇文章成功后也要删除该文章下所有的评论，上面 delCommentsByPostId 就是用来做这件事的*/

const marked = require('marked')
const connection = require('../lib/connect-mysql')

// 将 comment 的 content 从 markdown 转换成 html
// Comment.plugin('contentToHtml', {
//   afterFind: function (comments) {
//     return comments.map(function (comment) {
//       comment.content = marked(comment.content)
//       return comment
//     })
//   }
// })

module.exports = {
  // 创建一个留言
  create: function create (comment) {
    return new Promise((resolve, reject) => {
      var  sql = 'insert into comment(id,author,content,postId) values(0,?,?,?)';
      var  sqlParams = [comment.author, marked(comment.content), comment.postId];
      connection.query(sql, sqlParams, function (err, result) {
        if(err){
          reject(err);
        }else{
          resolve(result); 
        }      
      });
    })
  },

  // 通过留言 id 获取一个留言
  getCommentById: function getCommentById (commentId) {
    var sql = 'select * from comment where id = ? limit 1'
    connection.query(sql, commentId, function(err, comments){
      if(err){
          console.log(err);
        }else{
          return comments[0]; 
        }  
    })
  },

  // 通过留言 id 删除一个留言
  delCommentById: function delCommentById (commentId) {
    var sql = 'DELETE FROM comment where id =? limit 1';
    connection.query(sql, commentId,function (err, result) {
      if(err){
        console.log(err);  
      }else{
        return result;
      }   
    });
  },

  // 通过文章 id 删除该文章下所有留言
  delCommentsByPostId: function delCommentsByPostId (postId) {
    var sql = 'DELETE FROM comment where postId = ?';
    connection.query(sql, postId,function (err, result) {
      if(err){
        console.log(err);  
      }else{
        return result;
      }   
    });
  },

  // 通过文章 id 获取该文章下所有留言，按留言创建时间升序
  getComments: function getComments (postId) {
    function getAuthorInfor(userId){
      return new Promise((resolve, reject) => {
        var sql = 'select * from user where id = ? limit 1'
        connection.query(sql, userId, function (err, users) {
          if(err){
            reject(err);
          }else {
            resolve(users[0]);
          }
        })
      })
    }
    function getCommentsByPostId(postId){
      return new Promise((resolve, reject) => {
        var sql = 'select * from comment where postId = ? order by create_time desc'
        connection.query(sql, postId, function (err, comments) {
          if(err){
            reject(err);
          }else {
            resolve(comments); 
          }
        })
      })
    }
    
    async function getAllComments() {
      var comments = await getCommentsByPostId(postId);
      let promises = comments.map((comment) => getAuthorInfor(comment.author));
      let userArr = await Promise.all(promises); 
      comments.forEach((comment, index) => {
        comment['author'] = userArr[index];
      })
      return  Promise.resolve(comments);
    }
    return getAllComments();
  },

  // 通过文章 id 获取该文章下留言数
  getCommentsCount: function getCommentsCount (postId) {
    var sql = 'select count(id) fromcomment where postId = ?';
    connection.query(sql, postId,function (err, result) {
      if(err){
        console.log(err);  
      }else{
        return result;
      }   
    });
  }
}
