const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      maps = require('gulp-sourcemaps'),
       del = require('del');


gulp.task('scripts', () => {
  return gulp.src(['js/circle/jquery-3.3.1.js', 'js/circle/circle.js', 'js/circle/autogrow.js'])
  .pipe(maps.init())
  .pipe(concat('global.js'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('js'))

});




gulp.task('clean', () => {
  del('js/global*.js*');
});
