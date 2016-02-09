var elixir = require('laravel-elixir'),
    gulp = require('gulp'),
    bower = require('gulp-bower'),
    qunit = require('gulp-qunit'),
    phpunit = require('gulp-phpunit'),
    phplint = require('phplint').lint;
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.task('test');
    mix.task('bower');
    mix.copy('bower_components/bootstrap/less/*.less','resources/assets/less/bootstrap/');
    mix.copy('bower_components/bootstrap/less/mixins/*.less','resources/assets/less/bootstrap/mixins/');
    mix.copy('bower_components/summernote/dist/summernote.js','resources/assets/js/');
    mix.copy('bower_components/summernote/dist/summernote.css','resources/assets/css/summernote/');
    mix.less('frontend.less');
    mix.version('css/frontend.css');
    mix.browserify('summernote.js');
});

gulp.task('bower', function(){
  return bower();
});

gulp.task('phpunit',function() {
  return gulp.src('').pipe(phpunit());
});

gulp.task('qunit',function() {
  return gulp.src('tests/index.html').pipe(qunit());
});

gulp.task('phplint', function () {
    return phplint(['src/**/*.php'], {limit: 10});
});
gulp.task('test', ['phplint','phpunit','qunit']);
