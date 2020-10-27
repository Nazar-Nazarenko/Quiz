const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const imagemin = require('gulp-imagemin');
const minifyCSS = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const fileinclude = require('gulp-file-include');
const replaceInFile = require('gulp-string-replace');;
sass.compiler = require('node-sass');

const jsFiles = [
  'src/js/app.js',
  'src/js/quiz.js'
];

const envConfig = JSON.parse(fs.readFileSync('env.config.json', 'utf8'));
const env = process.env.NODE_ENV ? process.env.NODE_ENV.replace(' ', '') : 'prod';
const settings = envConfig.survey[env];

function styles() {
  return gulp.src('./src/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: settings['cleanCSSLevel']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src(jsFiles)
    .pipe(concat('app.js'))
    .pipe(replaceInFile('@@apiUrl', settings['pluginURL']))
    .pipe(uglify({
      toplevel: settings['uglifyLevel']
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}

function html() {
  return gulp
    .src('./src/**/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './src'
    }))
    .pipe(gulp.dest('dist/'))
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch('./src/**/*.scss', styles);
  gulp.watch('./src/**/*.css', styles);
  gulp.watch('./src/js/**/*.js', scripts);
  gulp.watch('./src/**/*.html', html);
  gulp.watch('./src/fonts/**/*', fonts);
  gulp.watch('./src/images/**/*.+(png|jpg|jpeg|gif|svg)', images);
}

function fonts() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.stream());
}

function clean() {
  return del(['dist/*', '!dist/images', '!dist/images/**/*']);
}

function images() {
  if (env === 'prod') {
    return gulp.src('./src/images/**/*.+(png|jpg|jpeg|gif|svg)')
      .pipe(imagemin({
        interlaced: settings['minifyImages'],
      }))
      .pipe(gulp.dest('dist/images'))
  } else {
    return gulp.src('./src/images/**/*.+(png|jpg|jpeg|gif|svg)')
      .pipe(gulp.dest('dist/images'))
  }
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('fonts', fonts);
gulp.task('images', images);
gulp.task('html', html);

gulp.task('build',
  gulp.series(clean, images,
    gulp.parallel(fonts, html, styles, scripts, html)
  ));

gulp.task('dev', gulp.series('build', 'watch'));
