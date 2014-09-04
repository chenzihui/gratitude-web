'use strict';

var gulp       = require('gulp'),

    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    handlebars = require('gulp-handlebars'),
    wrap       = require('gulp-wrap'),
    declare    = require('gulp-declare'),
    cssmin     = require('gulp-minify-css');


// Helpers
// ------------------------------

gulp.task('clean', function(done) {
  require('del')(['./build'], done);
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['concat:app']);
  gulp.watch('src/stylesheets/*.css', ['concat:css']);
  gulp.watch('src/templates/**/*.hbs', ['templates']);
});


// Prepare assets
// ------------------------------

gulp.task('concat:vendor', function() {
  gulp.src([
    './vendor/jquery/dist/jquery.min.js', './vendor/handlebars/handlebars.js',
    './vendor/ember/ember.js', './vendor/ember-data/ember-data.js'
  ])
  .pipe(concat('vendor.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./build/js/'));
});

gulp.task('concat:js', function() {
  gulp.src('./src/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('concat:css', function() {
  gulp.src(['./src/stylesheets/normalize.css', './src/stylesheets/*.css'])
    .pipe(concat('app.css'))
    .pipe(cssmin({
      keepSpecialComments: 1
    }))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('copy:assets', function() {
  gulp.src('./src/stylesheets/fonts/*')
    .pipe(gulp.dest('./build/fonts/'));
});

gulp.task(
  'concat:app',
  ['copy:assets', 'concat:vendor', 'concat:js', 'concat:css']
);


// Precompiling Handlebars
// ------------------------------

gulp.task('templates', function() {
  gulp.src('./src/templates/*.hbs')
    .pipe(handlebars({
      handlebars: require('ember-handlebars')
    }))
    .pipe(wrap('Ember.Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Ember.TEMPLATES',
      noRedeclare: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./build/js/'));
});


// Tasks
// ------------------------------

gulp.task('default', ['clean', 'concat:app', 'templates']);
gulp.task('dev', ['default', 'watch']);
