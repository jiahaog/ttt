import gulp from 'gulp';
import del from 'del';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import babel from 'babelify';
import runSequence from 'run-sequence';
import mocha from 'gulp-mocha';
import less from 'gulp-less';
import browserSync from 'browser-sync';
import ghPages from 'gulp-gh-pages';
import uglify from 'gulp-uglify';

function compileJs(watch) {
    var bundler = browserify('./src/js/main.js', { debug: true }).transform(babel);

    function rebundle() {
        bundler.bundle()
            .on('error', function (err) {
                console.error(err);
                this.emit('end');
            })
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/js'))
            .pipe(browserSync.reload({
                stream: true
            }));
    }

    if (watch) {
        bundler = watchify(bundler);
        bundler.on('update', () => {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
}

function watchJs() {
    return compileJs(true);
}

gulp.task('test', () => {
    return gulp.src('./test/**/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha());
});

gulp.task('js', ['test'], () => {
    return compileJs();
});

gulp.task('pages', () => {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist/'))
        //.pipe(browserSync.reload({
        //    stream: true
        //}));
});

gulp.task('less', () => {
    return gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('clean', callback => {
    del('dist').then(() => {
        callback();
    });
});

gulp.task('build', callback => {
    runSequence('clean', ['less', 'pages', 'js'], callback);
});

gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        browser: "google chrome"
    })
});

gulp.task('watch', ['browserSync', 'less', 'test', 'pages'], () => {
    watchJs();
    gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/**/*.html', ['pages']).on('change', browserSync.reload);
});

gulp.task('deploy', () => {
    // todo figure out bug why can't I do deploy with ['build'] as a prerequisite
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('default', ['watch']);
