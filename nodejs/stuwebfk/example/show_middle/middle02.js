// middle02.js 是中间件

module.exports = function(req, res, next){
	console.log('I am middle02');
	next();
}