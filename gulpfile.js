const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
  greplace = require('gulp-replace'),
     serve = require('gulp-serve'),
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
  .pipe(gulp.dest('dist/styles'));
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

gulp.task('preBuild', ['scripts', 'styles', 'images', 'copyIcons', 'copyHTML']);

gulp.task('build', ['clean'], () => {
  gulp.start('preBuild');
});

gulp.task('reload', ['styles'], () => {
  gulp.start('serve');
  setTimeout(() => {
    console.log();
    console.log('The server has been restarted.');
    console.log();
  }, 1000);
});

gulp.task('watchSass', () => {
  gulp.watch('sass/**/*.s*', ['reload']);
});

gulp.task('serve', serve({
    root: 'dist',
    port: 3000
}));

gulp.task('default', ['build'], () => {
  gulp.start('serve');
  gulp.start('watchSass');
  setTimeout(() => {
    console.log();
    console.log('Server is running on localhost:3000.  Press Ctrl-C to stop.  Thank you for building with gulp and have a nice day!');
    console.log();
  }, 1000);
});
