'use strict'
// 首先引入的是一些工具方法，下面我们就需要去util文件种看一下有哪些对应的工具方法
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
// webpack-merge是一个可以合并数组和对象的插件
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
// html-webpack-plugin用于将webpack编译打包后的产品文件注入到html模板中
// 即自动在index.html里面加上<link>和<script>标签引用webpack打包后的文件
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// friendly-errors-webpack-plugin用于更友好地输出webpack的警告、错误等信息
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 查找一个未使用的端口
const portfinder = require('portfinder')

// 获取host环境变量，用于配置开发环境域名
const HOST = process.env.HOST
// 获取post环境变量，用于配置开发环境时候的端口号
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        // 样式文件的处理规则，对css/sass/scss等不同内容使用相应的styleLoaders
        // 由utils配置出各种类型的预处理语言所需要使用的loader，例如sass需要使用sass-loader
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    // cheap-module-eval-source-map is faster for development
    // 使用这种source-map更快
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    // webpack插件
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        // 开启webpack热更新功能
        new webpack.HotModuleReplacementPlugin(),
        // 这个插件的主要作用就是在热加载的时候直接返回更新文件的名称，而不是文件的id
        new webpack.NamedModulesPlugin(),
        // webpack编译过程中出错的时候跳过报错阶段，不会阻塞编译，在编译结束后报错
        new webpack.NoEmitOnErrorsPlugin(),
        // 这个插件主要是生成一个html文件，自动将依赖注入html模板，并输出最终的html文件到目标文件夹
        new HtmlWebpackPlugin({
            filename: 'index.html',
            //favicon: path.resolve(__dirname, 'favicon.ico'),
            template: 'index.html',
            // 将所有的静态文件都插入到body文件的末尾
            inject: true
        }),
        // 拷贝静态资源
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    // 这种获取port的方式会返回一个promise
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // 把获取到的端口号设置为环境变量PORT的值
            process.env.PORT = port
            // 重新设置webpack-dev-server的端口的值
            devWebpackConfig.devServer.port = port

            // 将FriendlyErrorsPlugin添加到webpack的配置文件中
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                // 编译成功时候的输出信息
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                // 当编译出错的时候，根据config.dev.notifyOnErrors来确定是否需要在桌面右上角显示错误通知框
                onErrors: config.dev.notifyOnErrors
                ? utils.createNotifierCallback()
                : undefined
            }))
            // resolve我们的配置文件
            resolve(devWebpackConfig)
        }
    })
})
