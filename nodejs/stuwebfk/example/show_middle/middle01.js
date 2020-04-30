// middle01.js 是中间件

module.exports = function(req, res, next){
	console.log('I am middle01');
	next();
}