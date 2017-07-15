const path = require( 'path' );
const webpack = require( 'webpack' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const NODE_ENV = process.env.NODE_ENV || 'development';

const webpackConfig = {
	output: {
		path: __dirname + '/dist/',
		filename: 'js/app.min.js'
	},
	devtool: ( 'production' === NODE_ENV ) ? false : '#sourcemap',
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				// publicPath - https://goo.gl/qcWsSO
				loader: ExtractTextPlugin.extract( 'style-loader', 'css-loader', { publicPath: '../' } )
			},
			{
				test: /\.(woff|svg|ttf|eot)([\?]?.*)$/,
				loader: 'file-loader?name=fonts/[name].[ext]'
			},
			{
				test: /\.(jpg)([\?]?.*)$/,
				loader: 'file-loader?name=[path][name].[ext]'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin( [ 'dist' ], {
			verbose: false
		} ),
		// new CopyWebpackPlugin( [ {
		// 	from: 'node_modules/html5shiv/dist/html5shiv.min.js',
		// 	to: 'js'
		// } ] ),
		new webpack.DefinePlugin( {
			'process.env': {
				NODE_ENV: JSON.stringify( NODE_ENV ),
			}
		} ),
		new ExtractTextPlugin( 'css/style.css' ),
		new webpack.ProvidePlugin( {
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		} ),
	],
	resolve: {
		// alias: {
		// 	// Force any modules (materialize-css) that load their own version of jQuery to instead use
		// 	// this version (http://goo.gl/jlkA1e & https://goo.gl/autpDe).
		// 	jquery: path.join( __dirname, 'node_modules/jquery/src/jquery' )
		// },
		extensions: [ '.js', '.jsx' ]
	},
};

if ( NODE_ENV === 'development' ) {
	webpackConfig.plugins = webpackConfig.plugins.concat( [
		new webpack.LoaderOptionsPlugin( { debug: true } ),
	] );
}

if ( NODE_ENV === 'production' ) {
	webpackConfig.plugins.push( new webpack.optimize.UglifyJsPlugin( {
		compress: {
			warnings: false
		}
	} ) );

	webpackConfig.plugins.push( new webpack.optimize.DedupePlugin() );
}

module.exports = webpackConfig;
