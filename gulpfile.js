var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');

gulp.task('sass', function(){
    gulp.src('src/sass/style.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/resources/css'))
        .pipe(browserSync.stream());
});

gulp.task('server', function() {
    browserSync.init({
        server: "./"
    })
});

gulp.task('js', function(){
    gulp.src('src/js/app.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('dist/resources/js'))
});

gulp.task('default', ['server', 'js', 'sass'], function () {
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});