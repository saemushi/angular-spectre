'use strict';

const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const del = require('del');
const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const shell = require('gulp-shell');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const uglify = require('gulp-uglify');
const process = require('process');
const fs = require('fs');
const {
    spawnSync
} = require('child_process');

const STYLES = {
    SRC: './projects/angular-spectre/src/lib/core/styles/**/*',
    DIST: './dist/angular-spectre/styles',
    MAPS: './maps',
    THEMING: {
        SRC: './projects/angular-spectre/src/lib/core/styles/**/*',
        DIST: './dist/angular-spectre/lib/core/styles'
    },
    CONFIG: {}
};

gulp.task('build-style', () => {
    const prefixer = postcss([autoprefixer({
        browsers: ['last 5 versions', '> 3%'],
        cascade: false,
        grid: true
    })]);

    gulp.src(STYLES.THEMING.SRC)
        .pipe(gulp.dest(STYLES.THEMING.DIST));

    return gulp.src(STYLES.SRC)
        .pipe(sourcemaps.init())
        .pipe(sass.sync(STYLES.CONFIG).on('error', sass.logError))
        .pipe(prefixer)
        .pipe(sourcemaps.write(STYLES.MAPS))
        .pipe(gulp.dest(STYLES.DIST));
});

gulp.task('watch', () => {
    gulp.watch('./projects/angular-spectre/src/lib/**/*', () => {
        try {
            spawnSync('npm run build:lib', {
                stdio: 'inherit',
                shell: true,
                cwd: process.cwd()
            });
        } catch (err) {
            console.error(`Exception: ${err}`);
        }
    });
});
