const connection = require('../lib/connect-mysql')

module.exports = {
  // 注册一个用户
  create: function create (user) {
    // return User.create(user).exec()
    return new Promise((resolve, reject) => {
    	var  addSql = 'INSERT INTO user(id,name,password,avatar,gender,bio) VALUES(0,?,?,?,?,?)';
		var  addSqlParams = [user.name, user.password, user.avatar, user.gender, user.bio];
		connection.query(addSql, addSqlParams, function (err, result) {
		  	if(err){
		  		reject(err);
		  	}else{
		  	 	resolve(result); 
		  	}      
		});
    })
  },

  // 通过用户名获取用户信息
  getUserByName: function getUserByName (name) {
    // return User
    //   .findOne({ name: name })
    //   .addCreatedAt()
    //   .exec()
    return new Promise((resolve, reject) => {
	    var  sql = 'SELECT * FROM user WHERE name = ? limit 1';
		connection.query(sql, name, function (err, rows, fields) {
		  	if(err){
		  		reject(err);
		  	}else {
		  		resolve(rows); 
		  	}
		});
	})
  }
}
