var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var cache = require('gulp-cached');
var filter = require('gulp-filter');
var guppy = require('git-guppy')(gulp);
var mocha = require('gulp-mocha');

var testPath = {
  game: 'server/game/game-specs/game-spec-runner.js'
};

gulp.task('lint', function() {
  var jsFilter = filter(['**/*.js', '!node_modules/**', '!client/bower_components/**']);

  return gulp.src('**')
    .pipe(jsFilter) // use js filter
    .pipe(cache('linting')) // caches already linted files
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function(){
  gulp.watch('**', ['lint']);
});

gulp.task('pre-commit', function () {
  return gulp.src(guppy.src('pre-commit'))
    .pipe(filter(['**.js']))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('test-game', function() {
  return gulp.src(testPath.game, {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['lint', 'watch']);
