const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      csso = require('gulp-csso'),
      maps = require('gulp-sourcemaps'),
       del = require('del');


gulp.task('prepScripts', ['clean'], () => {
  return gulp.src(['js/circle/jquery-3.3.1.js', 'js/circle/circle.js', 'js/circle/autogrow.js'])
  .pipe(maps.init())
  .pipe(concat('global.js'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('js'));
});

gulp.task('scripts', ['prepScripts'], () => {
  return gulp.src('js/global.js')
  .pipe(uglify())
  .pipe(rename('all.min.js'))
  .pipe(gulp.dest('dist/scripts'));
});

gulp.task('prepStyles', ['clean'], () => {
  return gulp.src('sass/global.scss')
  .pipe(maps.init())
  .pipe(sass())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('css'));
});

gulp.task('styles', ['prepStyles'], () => {
  return gulp.src('css/global.css')
  .pipe(csso())
  .pipe(rename('all.min.css'))
  .pipe(gulp.dest('dist/styles'));
});

gulp.task('images', ['clean'], () => {
  return gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/content'));
});



gulp.task('clean', () => {
  return del('dist/*');
});


gulp.task('build', ['scripts', 'styles', 'images']);

gulp.task('default', ['build'], () => {
  gulp.src(['icons', 'index.html'])
  .pipe(gulp.dest('dist'))
  .pipe(gulp.src('icons/**'))
  .pipe(gulp.dest('dist/icons'));
});
