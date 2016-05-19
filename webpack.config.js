var webpack = require('webpack');
var path = require('path');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;
var libraryName = 'redux-modals-react';
var outputFile = libraryName + '.js';
var plugins = [], outputFile;

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName + '.min.js';
} else {
    outputFile = libraryName + '.js';
}

var config = {
    entry: __dirname + '/src/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/lib',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: {
                    presets: ["react", "es2015"],
                    plugins: [
                        "transform-class-properties",
                        "transform-object-rest-spread",
                        "add-module-exports"
                    ]
                }
            }
        ]
    },
    resolve: {
        root: path.resolve('./src'),
        extenstions: ['', '.js']
    },
    plugins: plugins
};

module.exports = config;
