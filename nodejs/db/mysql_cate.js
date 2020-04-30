var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',  user: 'root',  password: '',  database: 'nodejs',  connectionLimit: 10,  supportBigNumbers: true
});

var bmid = 5;

/*
+----+------------+-----+
| id | name       | pid |
+----+------------+-----+
|  1 | 国内商品   |   0 |
|  2 | 海淘       |   0 |
|  3 | 箱包服饰   |   1 |
|  4 | 数码电器   |   1 |
|  5 | 水果生鲜   |   1 |
|  6 | 笔记本电脑 |   4 |
|  7 | 苹果       |   5 |
|  8 | 食品       |   2 |
|  9 | 个人护理   |   2 |
| 10 | 香蕉       |   8 |
| 11 | 洗面奶     |   5 |
| 12 | 自产       |   0 |
| 13 | 新鲜水果   |   5 |
+----+------------+-----+
*/

var sql = "select id, pid from cate";
pool.getConnection(function(err, connection) {   // get a connection from the pool
    if (err) return console.log(err);
    connection.query(sql, function(err, results) {
        if (err) return console.log(err);
        var idPidArr = {};

        /*
        [{ id: 1, pid: 0 },{ id: 2, pid: 0 },{ id: 3, pid: 1 },{ id: 4, pid: 1 },{ id: 5, pid: 1 },
         { id: 6, pid: 4 },{ id: 7, pid: 5 },{ id: 8, pid: 2 },{ id: 9, pid: 2 },{ id: 10, pid: 8 },
         { id: 11, pid: 5 },{ id: 12, pid: 0 },{ id: 13, pid: 5}]
        */

        /* 查找父分类下的所有子分类 */
        results.forEach((result, index) => {
        	var id = result.id;
        	idPidArr[id] = result.pid;
        })

        // { '1': 0,'2': 0,'3': 1,'4': 1,'5': 1,'6': 4,'7': 5,'8': 2,'9': 2,'10': 8,'11': 5,'12': 0,'13': 5 }

        var pids = new Set([bmid]);
		do {
		    var len = pids.size;

		    for(var id in idPidArr) {
		        if (pids.has(idPidArr[id])) {  // 表示该值是否为Set的成员
		            pids.add(Number(id));
		            delete idPidArr[id]; 
		        }
		    }
		} while (pids.size>len);

		console.log(Array.from(pids));        // [ 5, 7, 11, 13 ]

		/*  通过子分类查找最顶级父分类 */
		// 查询后 将结果处理成 如下php数组格式 // id => pid 建议将这数组缓存起来
		var arr = [0];
		results.forEach((result, index) => {
        	var id = result.id;
        	arr.push(result.pid);
        })
		var id = 13;
		while(arr[id]) {
		    id = arr[id];
		}
		console.log(id);   // 1
    });
});



