var gulp = require('gulp');
var concat = require('gulp-concat');
var transform = require('vinyl-transform');
var browserify = require('browserify');
var reactify = require('reactify');

gulp.task('browserify', function () {
  var browserified = transform(function (filename) {
    return browserify(filename)
            .transform(reactify)
            .bundle();
  });

  return gulp.src('src/js/main.js')
    .pipe(browserified)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['browserify', 'copy']);

gulp.task('watch', function () {
  return gulp.watch('src/**/*', ['default']);
});
