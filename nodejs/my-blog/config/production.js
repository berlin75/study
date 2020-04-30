module.exports = {
	port: 8888,
	session: {
		secret: "myblog",
		key   : "myblog",
		maxage: 2592000000 
	},
	mongodb: "mongodb://localhost:27017/myblog"
}