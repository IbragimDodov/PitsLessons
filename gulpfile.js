const   gulp            = require('gulp'),
        concat          = require('gulp-concat'),
        autoprefixer    = require('gulp-autoprefixer'),
        cleanCSS        = require('gulp-clean-css'),
        uglify          = require('gulp-uglify'),
        del             = require('del'),
        browserSync     = require('browser-sync').create(),
        sourcemaps      = require('gulp-sourcemaps'),
        sass            = require('gulp-sass');



const cssFiles = [
    // './src/css/main.scss',
    './sass/style.sass',
    './sass/_mixins.sass',
    './sass/_media.scss',
    './sass/_sprites.sass',
    './sass/_normalize.sass'

]

const jsFiles = [
    './js/jquery-3.2.1.min.js',
    './js/jquery.formstyler.min.js',
    // './js/lib.js',
    './js/custom.js'
]


function styles() {
    return gulp.src(cssFiles)
    .pipe(sourcemaps.init())
    .pipe(sass())

    .pipe(concat('style.css'))

    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))

    .pipe(cleanCSS({level: 2}))

    .pipe(sourcemaps.write('./'))


    .pipe(gulp.dest('./build/css'))

    .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(jsFiles)

    .pipe(concat('custom.js'))
    
    .pipe(uglify({toplevel: true}))

    .pipe(gulp.dest('./build/js'))
    
    .pipe(browserSync.stream());
}

function clean() {
    return del(['build/*'])
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    // gulp.watch('./src/css/**/*.css', styles)

    gulp.watch('./sass/**/*.scss', styles)
    gulp.watch('./sass/**/*.sass', styles)

    gulp.watch('./js/**/*.js', scripts)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));

gulp.task('dev', gulp.series('build', 'watch'))