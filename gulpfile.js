var Promise = (global || window).Promise = require('bluebird'); //Bluebird promise are way better than native
var fs = Promise.promisifyAll(require('fs')); //We just want promise seriously

var gulp = require('gulp');
// CSS Dep
var sass = require('gulp-sass');

// BROWSERIFY Dep
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify')
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

//CSS Dep
var minifyCss = require('gulp-minify-css');

//Utils
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var assign = require('lodash.assign');
var filter = require('gulp-filter');
var through = require('through');

// Browserify setup
/* What we want right now :
 * - babelify experimental
 * - watchified bundle generation
 */

 customBrowserifyOpts = {
	entries: ['./app/scripts/main.js'],
	debug: gutil.env.type == 'prod' ? false : true,
}

var opts = assign({}, watchify.args, customBrowserifyOpts);

gulp.task('images', function() {
	gulp.src('./app/images/*.*')
		.pipe(gulp.dest('./dist/assets/images/'));
});

gulp.task('css-vendor', function() {
	//This is a bit hackish but right now i don't care
	gulp.src('./node_modules/normalize.css/normalize.css')
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('./dist/assets/'));
})


gulp.task('css-app', function() {
	gulp.src('./app/styles/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(concat('app.css'))
		.pipe(sourcemaps.write())
		.pipe(gutil.env.type == 'prod' ? minifyCss() : gutil.noop())
		.pipe(gulp.dest('./dist/assets/'))
		.pipe(filter('**/*.css'))
		.pipe(browserSync.reload({stream:true}));
});

function bundle() {
	return b.then(function(b) {

		return b.bundle()
			.on('error', gutil.log.bind(gutil, 'Browserify Error'))
			.pipe(source('bundle.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps:true}))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./dist'))
	})
}

var readPrelude = fs.readFileAsync('./__prelude.js');

var bBase = readPrelude.then(function(prelude) {
	return browserify(opts)
		.transform(function(file) {
			var data = prelude;
			return through(write, end);

			function write(buf) { data += buf }

			function end() {
				this.queue(data);
				this.queue(null);
			}
		})
		.transform(babelify.configure({
			stage: 0 //enabling that es7 goodness
		}));
});

var b = bBase.then(function(browserify) {
	var b = watchify(browserify)
	b.on('update',bundle);
	b.on('log',gutil.log);
	return b;
});

gulp.task('browserify', bundle);

gulp.task('build', [], function() {

})

gulp.task('serve', ['images','css-vendor','css-app', 'browserify'], function() {
	browserSync.init({
		server:'./dist'
	});

	gulp.watch('./app/styles/*.scss',['css-app']);
	gulp.watch('./dist/bundle.js',browserSync.reload);
});

gulp.task('default',['serve']);
