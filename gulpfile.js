var gulp = require('gulp')
  ,imagemin = require('gulp-imagemin')
  ,clean = require('gulp-clean')
  ,concat = require('gulp-concat')
  ,htmlReplace = require('gulp-html-replace');

// removida a dependência de build-img
gulp.task('copy', ['clean'], function() {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});

// adicionando a dependência copy
gulp.task('build-img', function() {

  gulp.src('dist/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('build-js', function() {
    gulp.src(['dist/js/jquery.js', 
      'dist/js/home.js', 
      'dist/js/ativa-filtro.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build-html', function() {

    gulp.src('dist/**/*.html')
        .pipe(htmlReplace({
            'js': 'js/all.js'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['copy'], function() {
    gulp.start('build-img', 'build-html', 'build-js');
});

