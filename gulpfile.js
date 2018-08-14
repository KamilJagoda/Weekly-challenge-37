var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var clean = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
    gulp.src('./app/scss/styles.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(clean())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function () {
    gulp.src([
    	'./app/js/other.js',
		'./app/js/app.js'
	])
		.pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', ['default'], function () {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/js/**/*.js', ['js']);
	gulp.watch('app/*.html', ['static']);
	gulp.watch('app/css/**/*.css', ['static']);

});

gulp.task('clean', function () {
	return del('./dist');
});
gulp.task('static', function(){
	gulp.src('./app/**/*.html').pipe(gulp.dest('./dist'));
	gulp.src('./app/img/**/*.*').pipe(gulp.dest('./dist/img/'));
    gulp.src('./app/css/**/*.css').pipe(gulp.dest('./dist/css'));
    gulp.src('./app/js/vendor/*.js').pipe(gulp.dest('./dist/js'));
    gulp.src('./app/fonts/**/*.*').pipe(gulp.dest('./dist/fonts'));
});

gulp.task('build', ['clean'], function () {
	gulp.start(['static','sass', 'js']);
});

gulp.task('default', ['build']);
