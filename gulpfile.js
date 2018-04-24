const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
  greplace = require('gulp-replace'),
   connect = require('gulp-connect'),
      csso = require('gulp-csso'),
      maps = require('gulp-sourcemaps'),
       del = require('del');

gulp.task('prepScripts', () => {
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

gulp.task('prepStyles', () => {
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
  .pipe(gulp.dest('dist/styles'))
  .pipe(connect.reload());
});

gulp.task('images', () => {
  return gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/content'));
});

gulp.task('clean', () => {
  return del(['dist/*', 'js/global.js*', 'css/*']);
});

gulp.task('copyIcons', () => {
  gulp.src('icons/**', {base: '.'})
  .pipe(gulp.dest('dist'));
});

gulp.task('copyHTML', () => {
  gulp.src('index.html')
  .pipe(greplace(/images/g, 'content'))
  .pipe(greplace('css/global.css', 'styles/all.min.css'))
  .pipe(greplace('js/global.js', 'scripts/all.min.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('preBuild', ['scripts', 'styles', 'images', 'copyIcons', 'copyHTML'], () => {
    return gulp.start('serve');
});

gulp.task('build', ['clean'], () => {
  return gulp.start('preBuild');
});

gulp.task('watchSass', () => {
  return gulp.watch('sass/**/*.s*', ['styles']);
});

gulp.task('serve', ['watchSass'], () => {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 3000
  });
});

gulp.task('default', ['build']);
