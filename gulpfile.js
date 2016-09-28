var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var minify = require('gulp-minify');

gulp.task('sass', function(){
    gulp.src([
        'bower_components/bootstrap/assets/stylesheets/_bootstrap.scss',
        'src/sass/style.scss'
    ])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/resources/css'))
        .pipe(browserSync.stream());
});

gulp.task('server', function() {
    browserSync.init({
        server: "./"
    })
});

gulp.task('compress', function() {
    gulp.src('src/js/app.js')
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('dist/resources/js'))
});

gulp.task('default', ['server', 'compress', 'sass'], function () {
    gulp.watch('src/js/*.js', ['compress']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});