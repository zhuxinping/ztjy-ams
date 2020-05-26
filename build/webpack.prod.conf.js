'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// copy-webpack-plugin，用于将static中的静态文件复制到产品文件夹dist
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// optimize-css-assets-webpack-plugin，用于优化和最小化css资源
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
    module: {
        // 样式文件的处理规则，对css/sass/scss等不同内容使用相应的styleLoaders
        // 由utils配置出各种类型的预处理语言所需要使用的loader，例如sass需要使用sass-loader
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    // // 配置生产环境中使用的source map的形式。在这里，生产环境使用的是#source map的形式
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    // webpack输出路径和命名规则
    output: {
        // build所产生的文件的存放的文件夹地址
        path: config.build.assetsRoot,
        // build之后的文件的名称
        // 这里[name]和[chunkhash]都是占位符
        // 其中[name]指的就是模块的名称
        // [chunkhash]chunk内容的hash字符串，长度为20
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        // [id]也是一个占位符，表示的是模块标识符(module identifier)
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // 压缩javascript的插件
        new UglifyJsPlugin({
            uglifyOptions: {
                // 配置压缩的行为
                compress: {
                    // 在删除未使用的变量等时，显示警告信息，默认就是false
                    warnings: false,
                    // 删除debugger
                    drop_debugger: true,
                    // 删除console
                    drop_console: true,
                    pure_funcs: ['console.log']
                }
            },
            // 使用 source map 将错误信息的位置映射到模块（这会减慢编译的速度）
            // 而且这里不能使用cheap-source-map
            sourceMap: config.build.productionSourceMap,
            // 使用多进程并行运行和文件缓存来提高构建速度
            parallel: true
        }),
        // 将css提取到单独的文件
        new ExtractTextPlugin({
            // 提取之后css文件存放的地方
            // 其中[name]和[contenthash]都是占位符
            // [name]就是指模块的名称
            // [contenthash]根据提取文件的内容生成的 hash
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            // 从所有额外的 chunk(additional chunk) 提取css内容
            // （默认情况下，它仅从初始chunk(initial chunk) 中提取）
            // 当使用 CommonsChunkPlugin 并且在公共 chunk 中有提取的 chunk（来自ExtractTextPlugin.extract）时
            // 这个选项需要设置为true
            allChunks: true,
        }),
        // 使用这个插件压缩css，主要是因为，对于不同组件中相同的css可以剔除一部分
        new OptimizeCSSPlugin({
            // 这个选项的所有配置都会传递给cssProcessor
            // cssProcessor使用这些选项决定压缩的行为
            cssProcessorOptions: config.build.productionSourceMap
                ? { safe: true, map: { inline: false } }
                : { safe: true }
        }),
        // 创建一个html文件
        new HtmlWebpackPlugin({
            // 生成的文件的名称
            filename: config.build.index,
            //favicon: path.resolve(__dirname, 'favicon.ico'),
            // 使用的模板的名称
            template: 'index.html',
            // 把script和link标签放在body底部
            inject: true,
            minify: {
                // 移除注释
                removeComments: true,
                // 去除空格和换行
                collapseWhitespace: true,
                // 尽可能移除属性中的引号和空属性
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // 控制chunks的顺序，这里表示按照依赖关系进行排序
            // 也可以是一个函数，自己定义排序规则
            chunksSortMode: 'dependency'
        }),
        // 根据模块的相对路径生成一个四位数的hash作为模块id
        new webpack.HashedModuleIdsPlugin(),
        // webpack2处理过的每一个模块都会使用一个函数进行包裹
        // 这样会带来一个问题：降低浏览器中JS执行效率，这主要是闭包函数降低了JS引擎解析速度。
        // webpack3中，通过下面这个插件就能够将一些有联系的模块，
        // 放到一个闭包函数里面去，通过减少闭包函数数量从而加快JS的执行速度
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 这个插件用于提取多入口chunk的公共模块
        // 通过将公共模块提取出来之后，最终合成的文件能够在最开始的时候加载一次
        // 然后缓存起来供后续使用，这会带来速度上的提升。
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            // 把所有从mnode_modules中引入的文件提取到vendor中
            minChunks (module) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // 为了将项目中的第三方依赖代码抽离出来，官方文档上推荐使用这个插件，当我们在项目里实际使用之后，
        // 发现一旦更改了 app.js 内的代码，vendor.js 的 hash 也会改变，那么下次上线时，
        // 用户仍然需要重新下载 vendor.js 与 app.js——这样就失去了缓存的意义了。所以第二次new就是解决这个问题的
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),

        // 拷贝静态资源到build文件夹中
        new CopyWebpackPlugin([
            {
                // 定义要拷贝的资源的源目录
                from: path.resolve(__dirname, '../static'),
                // 定义要拷贝的资源的目标目录
                to: config.build.assetsSubDirectory,
                // 忽略拷贝指定的文件，可以使用模糊匹配
                ignore: ['.*']
            },
	        {
		        // 定义要拷贝的资源的源目录
		        from: path.resolve(__dirname, '../version.txt'),
		        // 定义要拷贝的资源的目标目录
		        to: config.build.assetsRoot,
		        // 忽略拷贝指定的文件，可以使用模糊匹配
		        ignore: ['.*']
	        },
	        {
		        // 定义要拷贝的资源的源目录
		        from: path.resolve(__dirname, '../favicon.ico'),
		        // 定义要拷贝的资源的目标目录
		        to: config.build.assetsRoot,
		        // 忽略拷贝指定的文件，可以使用模糊匹配
		        ignore: ['.*']
	        }
        ])
    ]
})

// 如果开启了生产环境的gzip
if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            // 目标资源的名称
            // [path]会被替换成原资源路径
            // [query]会被替换成原查询字符串
            asset: '[path].gz[query]',
            // gzip算法
            // 这个选项可以配置成zlib模块中的各个算法
            // 也可以是(buffer, cb) => cb(buffer)
            algorithm: 'gzip',
            // 处理所有匹配此正则表达式的资源
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            // 只处理比这个值大的资源
            threshold: 10240,
            // 只有压缩率比这个值小的资源才会被处理
            minRatio: 0.8
        })
    )
}

// 如果需要生成一分bundle报告，则需要使用下面的这个插件
if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
