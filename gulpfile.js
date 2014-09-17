'use strict';

var gulp       = require('gulp'),

    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    handlebars = require('gulp-handlebars'),
    wrap       = require('gulp-wrap'),
    declare    = require('gulp-declare'),
    cssmin     = require('gulp-minify-css'),
    webserver  = require('gulp-webserver');


// Helpers
// ------------------------------

gulp.task('clean', function(done) {
  require('del')(['./build'], done);
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['concat:app']);
  gulp.watch('src/stylesheets/*.css', ['concat:css']);
  gulp.watch('src/templates/**/*.hbs', ['concat:app', 'templates']);
});


// Prepare assets
// ------------------------------

gulp.task('concat:vendor', function() {
  gulp.src([
    './vendor/jquery/dist/jquery.js', './vendor/handlebars/handlebars.js',
    './vendor/ember/ember.js', './vendor/ember-data/ember-data.js'
  ])
  .pipe(concat('vendor.js'))
  .pipe(uglify({
    mangle: false
  }))
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

  gulp.src('./src/images/*')
    .pipe(gulp.dest('./build/images/'));
});

gulp.task(
  'concat:app',
  ['copy:assets', 'concat:vendor', 'concat:js', 'concat:css']
);


// Precompiling Handlebars
// ------------------------------

gulp.task('templates', function() {
  gulp.src('./src/templates/**/*.hbs')
    .pipe(handlebars({
      handlebars: require('ember-handlebars')
    }))
    .pipe(wrap('Ember.Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Ember.TEMPLATES',
      noRedeclare: true,

      processName: function(path) {
        var path = path.replace('src/templates/', ''),
            name = declare.processNameByPath(path);

        return name.split('.').join('/')
      }
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./build/js/'));
});


// Web Server
// ------------------------------

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: false,
      port: 4000
    }));
});


// Tasks
// ------------------------------

gulp.task('default', ['clean', 'concat:app', 'templates']);
gulp.task('dev', ['concat:app', 'templates', 'webserver', 'watch']);
