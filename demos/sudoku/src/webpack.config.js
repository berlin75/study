//模块,导出配置对象
var webpack = require('webpack');
module.exports = {
	entry: './js/index.js',
	output: {
		filename: '[name].js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.js']
	},
	module: {
		loader: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					preset: ['es2015']
				}
			}
		]
	}
};