const { series, src, dest, watch } = require('gulp')
const concat = require('gulp-concat')
const postcss = require('gulp-postcss')
const cssnext = require('postcss-cssnext')
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('cssnano')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const plugins = [
    cssnano({
        preset: [
            'advanced',
            {
                discardComments: {
                    removeAll: true
                },
                reduceIdents: false,
                mergeIdents: false,
                autoprefixer: false,
                'postcss-zindex': false,
                zindex: false
            }
        ],
        discardComments: {
            removeAll: true
        },
        reduceIdents: false,
        mergeIdents: false,
        autoprefixer: false,
        'postcss-zindex': false,
        zindex: false
    }),
    cssnext({ browsers: ['last 1 version'] })
]

function compile() {
    return src('./packages/styles/*.less')
        .pipe(less())
        .pipe(
            autoprefixer({
                cascade: false
            })
        )
        .pipe(postcss(plugins, {}))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('./dist/styles'))
}

const concatCSS = series(compile, function (cb) {
    src(['./dist/styles/*.css']).pipe(sourcemaps.init()).pipe(concat('index.css')).pipe(postcss(plugins, {})).pipe(sourcemaps.write('.')).pipe(dest('./dist/styles'))
    cb()
})

// function copyfont() {
// 	return src('src/fonts/**').pipe(dest('./dist/fonts'));
// }

// function copyimage() {
// 	return src('src/img/**').pipe(dest('./dist/img'));
// }

exports.compile = compile
exports.concatCSS = concatCSS
// exports.copyfont = copyfont;
// exports.copyimage = copyimage;
exports.watch = function () {
    // You can use a single task
    watch('./packages/styles/*.less', concatCSS)
}
// exports.build = series(compile, copyfont);
// exports.default = series(concatCSS, copyfont);
exports.build = series(compile)
exports.default = series(concatCSS)
