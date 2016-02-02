var elixir = require('laravel-elixir'),
    gulp = require('gulp'),
    bower = require('gulp-bower'),
    qunit = require('gulp-qunit');

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
    mix.less('base.less');
    mix.less('frontend.less');
    mix.version('css/frontend.css');
    mix.phpUnit();
});

gulp.task('bower', function(){
  return bower();
});

gulp.task('test',function() {
  return gulp.src('tests/index.html').pipe(qunit());
});

elixir(function(mix) {
    mix.task('bower');
    mix.task('test');
});