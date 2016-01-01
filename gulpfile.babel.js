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
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/js'));
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
};

gulp.task('test', () => {
    return gulp.src('test/**/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha());
});

gulp.task('pages', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('js', ['test'], () => {
    return compileJs();
});

gulp.task('clean', callback => {
    del('dist').then(() => {
        callback();
    });
});

gulp.task('build', callback => {
    runSequence('clean', ['pages', 'js'], callback);
});

gulp.task('watch', ['test', 'pages'], () => {
    return watchJs();
});

gulp.task('default', ['watch']);
