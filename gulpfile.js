const fs = require('fs')
const gulp = require('gulp')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const util = require('gulp-util')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleancss = require('gulp-clean-css')

const production = process.env.NODE_ENV === 'production'
const babelrc = JSON.parse(fs.readFileSync('.babelrc'))

function doSass(src, dist) {
  const sassconf = {
    precision: 10,
    outputStyle: 'expanded',
  }
  return gulp.src(src)
    .pipe(plumber())
    .pipe(production ? util.noop() : sourcemaps.init())
    .pipe(sass(sassconf))
    .pipe(autoprefixer())
    .pipe(production ? cleancss() : util.noop())
    .pipe(production ? util.noop() : sourcemaps.write('./'))
    .pipe(gulp.dest(dist))
}
gulp.task('sass', () => doSass('src/css/renderer.scss', './publish/'))

gulp.task('babel', () => gulp.src(['src/js/*.jsx', 'src/js/**/*.jsx'], { base: 'src/js' })
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(babel(babelrc))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('src/js')))

gulp.task('watch', () => {
  gulp.watch(['src/css/*.scss', 'src/css/**/*.scss'], gulp.series('sass'))
  // gulp.watch(['src/js/*.jsx', 'src/js/**/*.jsx'], gulp.series('babel'))
})

gulp.task('default', gulp.series('sass'))
// gulp.task('default', gulp.series(gulp.parallel('babel', 'sass')))
