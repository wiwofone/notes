/* eslint-disable */
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/public');
var APP_DIR = path.resolve(__dirname, 'src/app');
var config = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    APP_DIR + '/index.js'
  ],
  output: {
    path: BUILD_DIR,
    publicPath: '/public/',
    filename: 'bundle.js',
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: 'src/',
    hot: true,
    historyApiFallback: true,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loaders: ['react-hot-loader/webpack', 'babel']
      }
    ]
  }
};

module.exports = config;
