'use strict';

var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var webpack = require('webpack');

function onBuild( done ) {
	return function( err, stats ) {
		if ( err ) {
			throw new gutil.PluginError( 'webpack', err );
		}

		gutil.log( stats.toString( {
			colors: true,
			chunks: false,
		} ) );

		if ( done ) {
			done();
		}
	};
}

function getWebpackConfig() {
	var config = Object.create( require( './webpack.config.js' ) );

	config.entry = [
		// './js/app.js',
		'./src/index.js'
	];

	return config;
}

gulp.task( 'react:build', function( done ) {
	webpack( getWebpackConfig() ).run( onBuild( done ) );
} );

gulp.task( 'react:watch', function() {
	webpack( getWebpackConfig() ).watch( 100, onBuild() );
} );

gulp.task( 'default', ['react:build' ] );
gulp.task( 'watch',   ['react:watch' ] );
