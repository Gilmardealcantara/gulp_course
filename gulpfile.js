var gulp = require('gulp')
  ,imagemin = require('gulp-imagemin')
  ,clean = require('gulp-clean')
  ,concat = require('gulp-concat')
  ,htmlReplace = require('gulp-html-replace')
  ,uglify = require('gulp-uglify')
  ,usemin = require('gulp-usemin')
  ,cssmin = require('gulp-cssmin')
  ,browserSync = require('browser-sync')
  ,jshint = require('gulp-jshint')
  ,jshintStylish = require('jshint-stylish')
  ,csslint = require('gulp-csslint')
  ,autoprefixer = require('gulp-autoprefixer');

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

//gulp.task('build-js', function() {
//    gulp.src(['dist/js/jquery.js', 
//      'dist/js/home.js', 
//      'dist/js/ativa-filtro.js'])
//        .pipe(concat('all.js'))
//        .pipe(uglify())
//        .pipe(gulp.dest('dist/js'));
//});
//
//gulp.task('build-html', function() {
//
//    gulp.src('dist/**/*.html')
//        .pipe(htmlReplace({
//            'js': 'js/all.js'
//        }))
//        .pipe(gulp.dest('dist/'));
//});

gulp.task('usemin', function() {
  return gulp.src('dist/**/*.html')
    .pipe(usemin({
      js: [uglify],
      css: [autoprefixer({
        browsers: ['last 5 versions']
      }), cssmin]
    }))
    .pipe(gulp.dest('dist'));
});

//gulp.task('default', ['copy'], function() {
//    gulp.start('build-img', 'build-html', 'build-js');
//});

gulp.task('server', function() {
  browserSync.init({
      server: {
          baseDir: 'src'
      }
  });

  gulp.watch('src/**/*.js').on('change', function(evt){
      gulp.src(evt.path)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish));
  });
  
  gulp.watch('src/css/**/*.css').on('change', function(event) {
      gulp.src(event.path)
          .pipe(csslint())
          .pipe(csslint.reporter());
   }); 

  gulp.watch('src/**/*').on('change', browserSync.reload);
});

gulp.task('default', ['copy'], function() {
  gulp.start('build-img', 'usemin');
});

