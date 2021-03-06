var gulp = require('gulp');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var js2dart = require('./gulp-js2dart');
var shell = require('gulp-shell');

gulp.task('spec/build', function() {
  return gulp
    .src('spec/**/*.js')
    .pipe(js2dart())
    .pipe(rename({extname: '.dart'}))
    .pipe(gulp.dest('spec'))
});


// TODO(vojta): Rebuild when changing src/* as well.
gulp.task('spec/watch', function() {
  return watch('spec/**/*.js')
    .pipe(js2dart())
    .pipe(rename({extname: '.dart'}))
    .pipe(gulp.dest('spec'))
});


gulp.task('test', ['spec/build'], shell.task([
  'dart --checked run_specs.dart'
]));
