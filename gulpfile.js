const gulp = require('gulp');
const gp_uglify = require('gulp-uglify-es').default;

function defaultTask(cb) {
  return gulp.src(['src/index.js'])
  .pipe(gp_uglify())
  .pipe(gulp.dest('build'));
}

exports.default = defaultTask;
