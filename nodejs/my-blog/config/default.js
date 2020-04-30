module.exports = {
	port: 3000,
	session: {
		secret: "myblog",
		key   : "myblog",
		maxage: 2592000000 
	},
	mongodb: "mongodb://localhost:27017/myblog"
}

/*
forever命令配置
forever -p . -l ./foreverlogs/access.log -o ./foreverlogs/out.log -e ./foreverlogs/error.log start index.js
*/