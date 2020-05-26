'use strict'
// 这个文件主要是对开发环境和生产环境的一个基本的配置
const path = require('path')

module.exports = {
	// 开发环境的一个基本配置
	dev: {
		// 编译输出的二级目录
		assetsSubDirectory: 'static',
		// 编译发布的根目录，可配置为资源服务器域名或者cdn域名
		assetsPublicPath: '/',
		// 需要使用proxyTable代理的接口(可以跨域)
		proxyTable: {},

		// 开发时候的访问域名。可以通过环境变量自己设置。
		host: '172.16.52.150',
		// 开发时候的端口。可以通过环境变量PORT设定。如果端口被占用了，会随机分配一个未被使用的端口
		port: 8586,
		// 是否自动打开浏览器
		autoOpenBrowser: true,
		// 下面两个都是浏览器展示错误的方式
		//  在浏览器是否展示错误蒙层
		errorOverlay: true,
		// 是否展示错误的通知
		notifyOnErrors: true,

		// 这个是webpack-dev-servr的watchOptions的一个选项，指定webpack检查文件的方式
		// 因为webpack使用文件系统去获取文件改变的通知。在有些情况下，这个可能不起作用。例如，当使用NFC的时候，
		// vagrant也会在这方面存在很多问题，在这些情况下，使用poll选项（以轮询的方式去检查文件是否改变）可以设定为true
		// 或者具体的数值，指定文件查询的具体周期。
		poll: false,

		// 是否使用eslint loader去检查代码
		useEslint: true,
		// 如果设置为true，在浏览器中，eslint的错误和警告会以蒙层的方式展现。
		showEslintErrorsInOverlay: false,

		/**
		 * Source Maps
		 */

		// source maps的格式
		devtool: 'cheap-module-eval-source-map',
		// 指定是否通过在文件名称后面添加一个查询字符串来创建source map的缓存
		cacheBusting: true,
		// 开启css的source map
		cssSourceMap: true
	},

	// 生产环境的一个基本配置
	build: {
		// html文件的生成的地方
		index: path.resolve(__dirname, '../dist/index.html'),

		// 编译生成的文件的目录
		assetsRoot: path.resolve(__dirname, '../dist'),
		// 编译生成的静态文件的目录
		assetsSubDirectory: 'static',
		// 编译发布的根目录，可配置为资源服务器域名或者cdn域名
		assetsPublicPath: '/',

		/**
		 * Source Maps
		 */

		productionSourceMap: true,
		devtool: '#source-map',

		// 是否开启生产环境的gzip压缩
		productionGzip: false,
		// 开启gzip压缩的文件的后缀名称
		productionGzipExtensions: ['js', 'css'],

		// 如果这个选项是true的话，那么则会在build后，会在浏览器中生成一份bundler报告
		bundleAnalyzerReport: process.env.npm_config_report
	}
}
