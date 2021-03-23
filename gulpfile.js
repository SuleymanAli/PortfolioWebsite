const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('browser-sync', () => {

  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("scss/**/*.scss", gulp.series('css'));
  // JavaScript Reload
  gulp.watch("js/**/*.js").on('change', browserSync.reload);
  gulp.watch("**/*.html").on('change', browserSync.reload);;
});

gulp.task('css', () => {
  return gulp.src('scss/**/*.scss')
  .pipe(sass({
    outputStyle: 'expanded',
    precision: 10,
    includePaths: ['.']
  }).on('error', sass.logError))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream());
});

gulp.task('build', () => {
  // Copy CSS Assets To Public Folder
  // gulp.src('css/**')
  // .pipe(cleanCSS({ compatibility: 'ie8' }))
  // .pipe(gulp.dest('./public/css/'));
  // Copy JS Assets To Public Folder
  gulp.src('js/**').pipe(gulp.dest('./public/js/'));
  // Copy File Assets To Public Folder
  gulp.src('assets/**').pipe(gulp.dest('./public/assets/'));
  // Copy Html Assets To Public Folder
  return gulp.src('**/*.html').pipe(gulp.dest('./public/'));
});

gulp.task('watch', gulp.series('browser-sync'));
