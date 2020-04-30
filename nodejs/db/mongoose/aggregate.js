var User = require("./user.js");

User.aggregate([
	{$match: {username: {$exists: true}}},
	{
      $project : {
          day : {$substr: [{"$add":["$logindate", 28800000]}, 0, 10] },//时区数据校准,分割成YYYY-MM-DD日期格式便于分组
          username: 1
       },
    },
    {
      $group: {
          _id:"$day",                         //将_id设置为day数据
          users:{$addToSet: "$username"}, 
      }
   },
   { $sort: {_id: 1} }  // 根据新的_id排序
]).exec(function (err, result){        //返回结果
	if(err) throw err;
    console.log(result);
});

/*
[ { _id: '2017-12-10', users: [ 'Tracy McGrady' ] },
  { _id: '2017-12-11', users: [ 'wangwu' ] },
  { _id: '2017-12-12', users: [ 'zhangsan', 'liuliu', 'lisi' ] },
  { _id: '2017-12-13', users: [ 'test date' ] } 
]
*/