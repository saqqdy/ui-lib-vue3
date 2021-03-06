const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')

const config = require('./config')
let plugins = [new ProgressBarPlugin(), new VueLoaderPlugin()],
    publicPath = process.env.PUBLIC_PATH || ''
if (process.env.ANALAYZ_REPORT) plugins.push(new BundleAnalyzerPlugin())
if (process.env.WEBPACK_DEV_SERVER) publicPath = 'https://127.0.0.1:9000' + publicPath
// __webpack_public_path__ = publicPath;
module.exports = {
    mode: 'production',
    watch: Boolean(process.env.BUILD_WATCH || false),
    entry: {
        app: ['./packages/index.ts']
    },
    devServer: {
        contentBase: path.join(__dirname, process.env.PUBLIC_PATH || ''),
        compress: true,
        host: '0.0.0.0',
        port: 9000
    },
    output: {
        path: path.resolve(process.cwd(), './dist'),
        publicPath,
        filename: 'index.cmd.js',
        chunkFilename: '[id].js',
        libraryExport: 'default',
        // library: 'UILIBVUE3',
        libraryTarget: 'commonjs2',
        sourceMapFilename: 'index.cmd.js.map'
    },
    resolve: {
        extensions: ['.js', '.ts', '.vue', '.json'],
        alias: config.alias,
        modules: ['node_modules']
    },
    externals: config.externals,
    performance: {
        hints: false
    },
    stats: {
        children: false
    },
    optimization: {
        minimize: false,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                parallel: true,
                extractComments: false
            }),
            // 注意位置，必须放在 TerserPlugin 后面，否则生成的注释描述会被 TerserPlugin 或其它压缩插件清掉
            new webpack.BannerPlugin({
                entryOnly: true, // 是否仅在入口包中输出 banner 信息
                banner: config.bannerText
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
                // options: {
                // 	compilerOptions: {
                // 		preserveWhitespace: false,
                // 	},
                // },
            },
            {
                test: /\.(jsx?|tsx?|babel|es6)$/,
                include: process.cwd(),
                exclude: config.jsexclude,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: path.resolve(__dirname, '../packages/styles/var.less')
                        }
                    }
                ]
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    esModule: false,
                    name: path.posix.join('img', '[name].[ext]?version=' + config.version + '.[hash:7]')
                }
            }
        ]
    },
    plugins
}
