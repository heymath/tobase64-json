'use strict';

var gulp, coffee, uglify, rename, src, build, test, filename;

gulp          = require('gulp');
coffee        = require('gulp-coffee');
uglify        = require('gulp-uglify');
rename        = require('gulp-rename');
src           = './src/';
build         = './build';
test          = './test/node_modules/tobase64-json';
filename      = 'tobase64-json';


gulp.task('js', function(){
  return gulp.src(src + filename + '.coffee', {read: true})
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest(build));
});

gulp.task('min', ['js'], function(){
  return gulp.src(build + '/' + filename + '.js')
    .pipe(uglify())
    .pipe(rename(filename + '.min.js'))
    .pipe(gulp.dest(build));
});

gulp.task('copySrc', function(){
  return gulp.src('./package.json')
    .pipe(gulp.dest(test));
});

gulp.task('copyBuild', ['min'], function(){
  return gulp.src(build + '/*')
    .pipe(gulp.dest(test + '/build'));
});

gulp.task('copy', ['copySrc', 'copyBuild']);

gulp.task('build', ['copy']);

gulp.task('default', ['build']);
