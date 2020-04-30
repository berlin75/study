const gulp = require('gulp');

//定义任务 转译js
gulp.task('webpack', () =>{   
	const webpack = require('webpack-stream');
	//配置webpack文件
	const config = require('./webpack.config.js');
	//源文件是当前目录下的js的所有文件夹下的所有js文件；把它输送给webpack(),把结果保存到js文件夹
	gulp.src('./js/**/*.js')
		.pipe(webpack(config))
		.pipe(gulp.dest('../www/js'));
});

//定义任务 编译less->css
gulp.task('less', () =>{  
	const less = require('gulp-less');
	gulp.src('./less/*.less') 
		.pipe(less())
		.pipe(gulp.dest('../www/css'))
});

//定义默认任务
gulp.task('default', ['webpack', 'less']);  