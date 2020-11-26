const path = require('path');
const { merge } = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const config = require('./config');

const serverConfig = {
  target: 'node',

  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: 'null-loader',
      },
    ],
  },
  entry: './index.js',
  externals: webpackNodeExternals(),
  output: {
    path: path.resolve('build'),
    filename: 'server.js',
    library: 'app',
    libraryTarget: 'commonjs2',
    publicPath: '/',
  },
};

module.exports = merge(config, serverConfig);
