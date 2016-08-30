/**
 * Created by increment on 06.08.16.
 */
var path = require('path'),
	webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'whatwg-fetch',
		'babel-polyfill',
		'./src/js/index'
	],
	output: {
		path: path.join(__dirname, 'bundle/js'),
		filename: 'bundle.min.js',
		publicPath: '/bundle/js/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
		})
	],
	module: {
		loaders: [
			{
				loaders: ['react-hot', 'babel-loader'],
				include: [
					path.resolve(__dirname, 'src/js')
				],
				test: /\.js$/
			},
			{
				loader: 'style-loader!css-loader!sass-loader',
				include: [
					path.resolve(__dirname, 'src/scss')
				],
				test: /\.scss$/
			}
		]
	}
};