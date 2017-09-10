'use strict';

var webpack = require('webpack'),
path = require('path');

var APP = __dirname + '/app';

module.exports = {
    context: APP,
    entry: {
           app: ['./core/bootstrap.js']
    },
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            settings: path.join(__dirname, 'app', 'core', 'config', 'settings.' + process.env.BRAINS_ENV)
        }
    },
    module: {
        loaders: [
            {
                test: /\.pug$/,
                loader: 'raw!pug-html'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.otf?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.js$/,
                loader: 'ng-annotate!babel!eslint-loader',
                exclude: /node_modules/
            }
        ]
    }
};