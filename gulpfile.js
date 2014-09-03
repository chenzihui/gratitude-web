'use strict';

var gulp       = require('gulp'),

    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    handlebars = require('gulp-handlebars'),
    wrap       = require('gulp-wrap'),
    declare    = require('gulp-declare'),
    cssmin     = require('gulp-cssmin');


// Helpers
// ------------------------------

gulp.task('clean', function(done) {
  require('del')(['./build'], done);
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['concat:app']);
  gulp.watch('src/templates/**/*.js', ['templates']);
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
  .pipe(gulp.dest('./build/'));
});

gulp.task('concat:js', function() {
  gulp.src('./src/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
});

gulp.task('concat:css', function() {
  gulp.src(['./src/stylesheets/normalize.css', './src/stylesheets/base.css'])
    .pipe(concat('app.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./build'));
});

gulp.task('concat:app', ['concat:vendor', 'concat:js', 'concat:css']);


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
    .pipe(gulp.dest('./build/'));
});


// Tasks
// ------------------------------

gulp.task('default', ['clean', 'concat:app', 'templates']);
